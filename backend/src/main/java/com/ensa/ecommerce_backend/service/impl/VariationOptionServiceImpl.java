package com.ensa.ecommerce_backend.service.impl;


import com.ensa.ecommerce_backend.dto.VariationOptionDto;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import com.ensa.ecommerce_backend.entity.VariationOptionEntity;
import com.ensa.ecommerce_backend.exception.VariationNotFoundException;
import com.ensa.ecommerce_backend.mapper.VariationOptionMapper;
import com.ensa.ecommerce_backend.repository.VariationOptionRepository;
import com.ensa.ecommerce_backend.repository.VariationRepository;
import com.ensa.ecommerce_backend.request.AddVariationOptionRequest;
import com.ensa.ecommerce_backend.service.VariationOptionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VariationOptionServiceImpl implements VariationOptionService {

    private VariationOptionRepository variationOptionRepository;

    private VariationRepository variationRepository;

    @Override
    public VariationOptionDto addVariationOption(AddVariationOptionRequest addVariationOptionRequest) {

        VariationEntity variation = variationRepository.findById(addVariationOptionRequest.getVariationId()).orElseThrow(()->new VariationNotFoundException("Variation with id "+addVariationOptionRequest.getVariationId() +"not found"));
        VariationOptionEntity variationOption = VariationOptionEntity.builder()
                .value(addVariationOptionRequest.getOptionValue())
                .variation(variation)
                .build();
        variation.getVariations().add(variationOption);

        variationOptionRepository.save(variationOption);
        return VariationOptionMapper.mapVariationEntitytoVariationOptionDto(variationOption);
    }

    @Override
    public void deleteVariationOption(Long id) {
        variationOptionRepository.deleteById(id);
    }



}
