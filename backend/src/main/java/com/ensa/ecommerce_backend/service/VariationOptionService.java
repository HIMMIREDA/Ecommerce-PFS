package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.VariationOptionDto;
import com.ensa.ecommerce_backend.request.AddVariationOptionRequest;

public interface VariationOptionService {

    VariationOptionDto addVariationOption(AddVariationOptionRequest addVariationOptionRequest);

    void deleteVariationOption(Long id);


}
