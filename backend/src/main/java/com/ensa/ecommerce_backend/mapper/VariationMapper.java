package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.VariationDto;
import com.ensa.ecommerce_backend.entity.VariationEntity;

import java.util.stream.Collectors;

public class VariationMapper {
    static public VariationDto toDto(VariationEntity variation) {
        return VariationDto.builder()
                .id(variation.getId())
                .name(variation.getName())
                .variationOptions(
                        variation.getVariationOptions().stream().map(
                                (VariationOptionMapper::toDto)
                        ).collect(Collectors.toList())
                )
                .build();
    }
}
