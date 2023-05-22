package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.VariationDTO;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import org.springframework.beans.BeanUtils;

import java.util.stream.Collectors;

public class VariationMapper {
    public static VariationDTO mapVariationEntitytoVariationDTO(VariationEntity variationEntity){
        VariationDTO variationDTO = VariationDTO.builder()
                .id(variationEntity.getId())
                .variations(variationEntity.getVariations().stream().map(VariationOptionMapper::mapVariationEntitytoVariationOptionDTO).collect(Collectors.toList()))
                .name(variationEntity.getName())
                .build();
        return variationDTO;
    }
}
