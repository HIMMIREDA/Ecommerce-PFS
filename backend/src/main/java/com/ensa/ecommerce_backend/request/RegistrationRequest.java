package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
    @Length(min = 6, message = "must be more than 6 characters")
    private String password;

    @NotEmpty(message = "cant be empty")
    private String firstName;

    @NotEmpty(message = "cant be empty")
    private String lastName;

    @NotEmpty(message = "cant be empty")
    @Size(min = 10, max = 10)
    // @Phone
    private String phoneNumber;

    @NotEmpty(message = "cant be empty")
    private String address;

}
