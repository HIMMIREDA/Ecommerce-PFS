package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.VariationDto;

import com.ensa.ecommerce_backend.entity.VariationEntity;


import java.util.stream.Collectors;

public class VariationMapper {
    public static VariationDto mapVariationEntitytoVariationDTO(VariationEntity variationEntity){
        if(variationEntity.getVariations()!=null){
            VariationDto variationDTO = VariationDto.builder()
                    .id(variationEntity.getId())
                    .variations(variationEntity.getVariations().stream().map(VariationOptionMapper::mapVariationEntitytoVariationOptionDto).collect(Collectors.toList()))
                    .name(variationEntity.getName())
                    .build();
            return variationDTO;
        }
        else {
            VariationDto variationDTO = VariationDto.builder()
                    .id(variationEntity.getId())
                    .name(variationEntity.getName())
                    .build();
            return variationDTO;
        }

    }
}
