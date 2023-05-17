package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.VariationDto;
import com.ensa.ecommerce_backend.DTO.VariationOptionDto;
import org.springframework.data.domain.Page;

public interface VariationService {
    VariationDto saveVariation(VariationDto variationDto);

    void deleteVariationById(Long id);

    VariationDto updateVariationById(Long id, VariationDto variationDto);

    Page<VariationDto> getAllVariations();

    VariationDto getVariationById(Long id);

    VariationDto addVariationOptionToVariation(Long variationId, VariationOptionDto variationOptionDto);

    void deleteVariationOptionFromVariation(Long variationId, Long variationOptionId);
}
