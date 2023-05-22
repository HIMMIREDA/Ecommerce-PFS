package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.VariationOptionDTO;
import com.ensa.ecommerce_backend.request.AddVariationOptionRequest;

public interface VariationOptionService {

    VariationOptionDTO addVariationOption(AddVariationOptionRequest addVariationOptionRequest);

    void deleteVariationOption(Long id);


}
