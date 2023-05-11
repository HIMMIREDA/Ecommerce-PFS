package com.ensa.ecommerce_backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class VariationDto {
    private Long id;

    private String name;

    private List<VariationOptionDto> variationOptions = new ArrayList<>();

}
