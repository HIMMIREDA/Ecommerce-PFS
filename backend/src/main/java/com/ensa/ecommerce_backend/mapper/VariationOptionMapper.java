package com.ensa.ecommerce_backend.mapper;


import com.ensa.ecommerce_backend.DTO.VariationOptionDto;
import com.ensa.ecommerce_backend.entity.VariationOptionEntity;

public class VariationOptionMapper {
    static public VariationOptionDto toDto(VariationOptionEntity variationOptionEntity) {
        return VariationOptionDto.builder()
                .id(variationOptionEntity.getId())
                .name(variationOptionEntity.getName())
                .build();
    }


}
