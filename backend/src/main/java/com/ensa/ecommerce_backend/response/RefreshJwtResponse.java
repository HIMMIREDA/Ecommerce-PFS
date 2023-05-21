package com.ensa.ecommerce_backend.response;

import com.ensa.ecommerce_backend.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RefreshJwtResponse {
    private Long id;
    private String email;
    private String username;
    private String accessToken;
    private List<RoleEnum> roles;
}
