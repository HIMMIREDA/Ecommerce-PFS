package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.*;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import com.ensa.ecommerce_backend.enums.TokenType;
import com.ensa.ecommerce_backend.event.OnRegistrationCompleteEvent;
import com.ensa.ecommerce_backend.exception.EmailVerifTokenExpiredException;
import com.ensa.ecommerce_backend.exception.RefreshTokenNotValidException;
import com.ensa.ecommerce_backend.exception.UserAlreadyFoundException;
import com.ensa.ecommerce_backend.mapper.UserMapper;
import com.ensa.ecommerce_backend.repository.*;
import com.ensa.ecommerce_backend.request.LoginRequest;
import com.ensa.ecommerce_backend.request.RegistrationRequest;
import com.ensa.ecommerce_backend.response.LoginResponse;
import com.ensa.ecommerce_backend.response.RefreshJwtResponse;
import com.ensa.ecommerce_backend.response.RegistrationResponse;
import com.ensa.ecommerce_backend.security.jwt.JwtService;
import com.ensa.ecommerce_backend.service.AuthService;
import com.ensa.ecommerce_backend.service.CartService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final CartItemRepository cartItemRepository;

    private final CartService cartService;

    private ApplicationEventPublisher eventPublisher;

    @Override
    public EmailVerificationTokenEntity createEmailVerificationToken(UserEntity user, String token) {
        return emailVerificationTokenRepository.save(new EmailVerificationTokenEntity(user, token));
    }

    @Override
    public void verifyAccount(String token, HttpSession session) {
        EmailVerificationTokenEntity verificationToken = emailVerificationTokenRepository.findEmailVerificationTokenByToken(token).orElseThrow();

        if (verificationToken.getExpiryDate().before(new Date())) {
            throw new EmailVerifTokenExpiredException("this link has expired");
        }
        UserEntity user = verificationToken.getUser();
        user.setEnabled(true);
        user.setCart(
                CartEntity.builder()
                        .cartItems(new HashSet<>())
                        .total(0)
                        .user(user)
                        .build()
        );
        userRepository.save(user);
        List<EmailVerificationTokenEntity> userTokens = emailVerificationTokenRepository.findEmailVerificationTokenByUser(user).orElseThrow();
        emailVerificationTokenRepository.deleteAll(userTokens);
    }

    @Override
    public RegistrationResponse createUser(RegistrationRequest registrationRequest, HttpServletRequest httpRequest) {
        UserEntity user = UserMapper.toEntity(registrationRequest);
        String url = httpRequest.getRequestURI().replace("register", "confirm-registration");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setRoles(Collections.singletonList(roleRepository.findRoleByName(RoleEnum.USER)));
        user.setEnabled(false);

        if (userExists(user.getEmail(), user.getUsername())) {
            UserEntity fetchedUser = userRepository.findUserEntityByEmailOrUsername(user.getEmail(), user.getUsername()).orElseThrow();
            if (fetchedUser.getEmail().equals(user.getEmail()) && fetchedUser.getUsername().equals(user.getUsername()) && !fetchedUser.isEnabled()) {
                eventPublisher.publishEvent(new OnRegistrationCompleteEvent(fetchedUser, url));
                return RegistrationResponse.builder()
                        .id(fetchedUser.getId())
                        .email(fetchedUser.getEmail())
                        .build();
            } else {
                throw new UserAlreadyFoundException("user with email " + user.getEmail() + " or username " + user.getUsername() + " already found !");
            }
        }
        UserEntity savedUser = userRepository.save(user);
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(savedUser, url));
        return RegistrationResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .build();

    }

    @Override
    public boolean userExists(String email, String username) {
        return userRepository.findUserEntityByEmail(email).isPresent() || userRepository.findUserEntityByUsername(username).isPresent();
    }


    @Override
    public void logoutUser(String refreshToken) {
        refreshTokenRepository.deleteRefreshTokenByToken(refreshToken);
        SecurityContextHolder.clearContext();
    }

    @Override
    public RefreshJwtResponse refreshToken(String token) {

        RefreshTokenEntity refreshToken = refreshTokenRepository.findRefreshTokensByToken(token).orElseThrow();

        UserDetails userDetails = User.builder().username(refreshToken.getUser().getEmail()).password(refreshToken.getUser().getPassword()).disabled(!refreshToken.getUser().isEnabled()).authorities(refreshToken.getUser().getRoles().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toUnmodifiableSet())).build();

        if (!jwtService.isTokenValid(token, userDetails, TokenType.REFRESH)) {
            throw new RefreshTokenNotValidException("refresh token not valid");
        }

        String accessToken = jwtService.generateAccessToken(userDetails);

        return RefreshJwtResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    @Override
    public LoginResponse loginUser(LoginRequest request, HttpSession session, HttpServletResponse response) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserEntity user = userRepository.findUserEntityByEmail(request.getEmail()).orElseThrow();
        String accessToken = jwtService.generateAccessToken((UserDetails) authentication.getPrincipal());
        String refreshToken = jwtService.generateRefreshToken((UserDetails) authentication.getPrincipal());
        RefreshTokenEntity refreshTokenObject = RefreshTokenEntity.builder().token(refreshToken).user(user).build();
        refreshTokenRepository.save(refreshTokenObject);

        // merge session cart with mysql cart
        CartEntity sessionCart = (CartEntity) session.getAttribute("cart");
        if (sessionCart != null) {
            cartService.mergeCarts(sessionCart, user.getCart());
        }
        session.removeAttribute("cart");

        Cookie refreshTokenCookie = new Cookie("jwt-refresh-token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        response.addCookie(refreshTokenCookie);

        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles().stream().map(RoleEntity::getName).toList())
                .accessToken(accessToken)
                .build();
    }
}
