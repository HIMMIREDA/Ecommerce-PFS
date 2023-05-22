package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.VariationDTO;
import com.ensa.ecommerce_backend.DTO.VariationOptionDTO;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import com.ensa.ecommerce_backend.entity.VariationOptionEntity;
import com.ensa.ecommerce_backend.request.AddOptionToVariationRequest;
import com.ensa.ecommerce_backend.request.AddVariationRequest;

import java.util.List;

public interface VariationService {
    VariationDTO addVariation(AddVariationRequest addVariationRequest);

    void deleteVariation(Long id);

    VariationDTO getVariationById(Long id);

}
