package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddVariationOptionRequest {
    @NotEmpty
    Long variationId;
    @NotEmpty
    String optionValue;


}
