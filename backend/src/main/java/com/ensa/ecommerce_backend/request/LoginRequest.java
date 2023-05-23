package com.ensa.ecommerce_backend.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginRequest {
    @Email
    @NotEmpty(message = "cant be empty")
    private String email;
    @NotEmpty(message = "cant be empty")
    private String password;
}
