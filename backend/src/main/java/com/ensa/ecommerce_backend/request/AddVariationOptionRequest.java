package com.ensa.ecommerce_backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddVariationOptionRequest {

    Long variationId;
    String optionValue;


}
