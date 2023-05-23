package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.VariationDto;

import com.ensa.ecommerce_backend.request.AddVariationRequest;



public interface VariationService {
    VariationDto addVariation(AddVariationRequest addVariationRequest);

    void deleteVariation(Long id);

    VariationDto getVariationById(Long id);

}
