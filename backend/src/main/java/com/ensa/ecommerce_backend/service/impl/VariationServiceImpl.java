package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.VariationDto;
import com.ensa.ecommerce_backend.DTO.VariationOptionDto;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import com.ensa.ecommerce_backend.exception.VariationAlreadyFoundException;
import com.ensa.ecommerce_backend.mapper.VariationMapper;
import com.ensa.ecommerce_backend.repository.VariationRepository;
import com.ensa.ecommerce_backend.service.VariationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
public class VariationServiceImpl implements VariationService {
    private VariationRepository variationRepository;

    @Override
    public VariationDto saveVariation(VariationDto variationDto) {
        variationRepository.findByName(variationDto.getName()).ifPresent(
                (variation) -> {
                    throw new VariationAlreadyFoundException("a variation with name : " + variationDto.getName() + " already found ");
                });

        VariationEntity variation = VariationEntity.builder()
                .name(variationDto.getName())
                //.variationOptions(variationDto.getVariationOptions())
                .build();

        return VariationMapper.toDto(variationRepository.save(variation));
    }

    @Override
    public void deleteVariationById(Long id) {

    }

    @Override
    public VariationDto updateVariationById(Long id, VariationDto variationDto) {
        return null;
    }

    @Override
    public Page<VariationDto> getAllVariations() {
        return null;
    }

    @Override
    public VariationDto getVariationById(Long id) {
        return null;
    }

    @Override
    public VariationDto addVariationOptionToVariation(Long variationId, VariationOptionDto variationOptionDto) {
        return null;
    }

    @Override
    public void deleteVariationOptionFromVariation(Long variationId, Long variationOptionId) {

    }
}
