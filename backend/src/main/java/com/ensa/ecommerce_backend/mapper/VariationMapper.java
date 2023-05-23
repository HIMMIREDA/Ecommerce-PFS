package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.VariationDTO;
import com.ensa.ecommerce_backend.entity.VariationEntity;


import java.util.stream.Collectors;

public class VariationMapper {
    public static VariationDTO mapVariationEntitytoVariationDTO(VariationEntity variationEntity){
        if(variationEntity.getVariations()!=null){
            VariationDTO variationDTO = VariationDTO.builder()
                    .id(variationEntity.getId())
                    .variations(variationEntity.getVariations().stream().map(VariationOptionMapper::mapVariationEntitytoVariationOptionDTO).collect(Collectors.toList()))
                    .name(variationEntity.getName())
                    .build();
            return variationDTO;
        }
        else {
            VariationDTO variationDTO = VariationDTO.builder()
                    .id(variationEntity.getId())
                    .name(variationEntity.getName())
                    .build();
            return variationDTO;
        }

    }
}
