package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegistrationRequest {
    @NotEmpty
    @Length(min = 4)
    private String username;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Length(min = 6)
    private String password;
}