package com.ensa.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddressDto {
    private String addressLine;

    private Long postalCode;

    private String city;
    private String country;
}
