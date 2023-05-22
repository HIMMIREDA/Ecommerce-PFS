package com.ensa.ecommerce_backend.DTO;

import jakarta.validation.constraints.NotNull;
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
public class VariationDTO {

    Long id;

    String name;

    List<VariationOptionDTO> variations = new ArrayList<>();

}
