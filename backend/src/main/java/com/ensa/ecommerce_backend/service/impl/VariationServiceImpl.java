package com.ensa.ecommerce_backend.service.impl;


import com.ensa.ecommerce_backend.dto.VariationDto;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import com.ensa.ecommerce_backend.exception.ReviewNotFoundException;
import com.ensa.ecommerce_backend.exception.VariationNotFoundException;
import com.ensa.ecommerce_backend.mapper.ReviewMapper;
import com.ensa.ecommerce_backend.mapper.VariationMapper;
import com.ensa.ecommerce_backend.repository.VariationRepository;
import com.ensa.ecommerce_backend.request.AddOptionToVariationRequest;
import com.ensa.ecommerce_backend.request.AddVariationRequest;
import com.ensa.ecommerce_backend.service.VariationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Serial;

@Service
@AllArgsConstructor
public class VariationServiceImpl implements VariationService {

    private VariationRepository variationRepository;

    @Override
    public VariationDto addVariation(AddVariationRequest addVariationRequest) {
        VariationEntity variation = VariationEntity.builder()
                .name(addVariationRequest.getName())
                .build();
        variationRepository.save(variation);
        return VariationMapper.mapVariationEntitytoVariationDTO(variationRepository.save(variation));
    }

    @Override
    public void deleteVariation(Long id) {
        variationRepository.deleteById(id);
    }

    @Override
    public VariationDto getVariationById(Long id) {
        return VariationMapper.mapVariationEntitytoVariationDTO(
                variationRepository.findById(id).orElseThrow(() -> new VariationNotFoundException("Variation with id : " + id + " not found")));
    }

}
