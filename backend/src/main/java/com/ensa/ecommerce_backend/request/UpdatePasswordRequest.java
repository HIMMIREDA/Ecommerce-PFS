package com.ensa.ecommerce_backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdatePasswordRequest {
    private String oldPassword;
    private String newPassword;
}
