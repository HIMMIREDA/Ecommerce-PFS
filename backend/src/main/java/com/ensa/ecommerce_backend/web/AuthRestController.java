package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.request.LoginRequest;
import com.ensa.ecommerce_backend.request.RegistrationRequest;
import com.ensa.ecommerce_backend.response.LoginResponse;
import com.ensa.ecommerce_backend.response.RefreshJwtResponse;
import com.ensa.ecommerce_backend.response.RegistrationResponse;
import com.ensa.ecommerce_backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthRestController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody @Valid RegistrationRequest registrationRequest, HttpServletRequest httpRequest) {
        return new ResponseEntity<>(authService.createUser(registrationRequest, httpRequest), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest, HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginUser(loginRequest, response));
    }

    @GetMapping("/logout")
    public void logout(@CookieValue("jwt-refresh-token") String refreshToken, HttpSession session, HttpServletResponse response) {
        session.invalidate();
        authService.logoutUser(refreshToken, response);
    }

    @GetMapping("/refresh")
    public ResponseEntity<RefreshJwtResponse> refreshToken(@CookieValue(name = "jwt-refresh-token") String token) {
        return ResponseEntity.ok(authService.refreshToken(token));
    }

    @GetMapping("/confirm-registration")
    public void confirmRegistration(@RequestParam("token") String token) {
        authService.verifyAccount(token);
    }
}