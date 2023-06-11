package com.ensa.ecommerce_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VariationOptionDto {
    Long id;

    String value;
}
