package com.ensa.ecommerce_backend.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VariationDto {


        Long id;

        String name;

        List<VariationOptionDto> variations = new ArrayList<>();


}
