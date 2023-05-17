package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.EmailVerificationTokenEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.request.LoginRequest;
import com.ensa.ecommerce_backend.request.RegistrationRequest;
import com.ensa.ecommerce_backend.response.LoginResponse;
import com.ensa.ecommerce_backend.response.RefreshJwtResponse;
import com.ensa.ecommerce_backend.response.RegistrationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public interface AuthService {
    RegistrationResponse createUser(RegistrationRequest registrationRequest, HttpServletRequest httpRequest);

    LoginResponse loginUser(LoginRequest request, HttpSession session, HttpServletResponse response);

    void logoutUser(String refreshToken);

    boolean userExists(String email, String username);

    RefreshJwtResponse refreshToken(String token);

    EmailVerificationTokenEntity createEmailVerificationToken(UserEntity user, String token);

    void verifyAccount(String token, HttpSession session);
}

