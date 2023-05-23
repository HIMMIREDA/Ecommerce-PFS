package com.ensa.ecommerce_backend.mapper;



import com.ensa.ecommerce_backend.dto.VariationOptionDto;
import com.ensa.ecommerce_backend.entity.VariationEntity;

import com.ensa.ecommerce_backend.entity.VariationOptionEntity;
import org.springframework.beans.BeanUtils;

public class VariationOptionMapper {
    public static VariationOptionDto mapVariationEntitytoVariationOptionDto(VariationOptionEntity variationOptionEntity){
        VariationOptionDto variationOptionDTO = new VariationOptionDto();
        BeanUtils.copyProperties(variationOptionEntity,variationOptionDTO);
        return variationOptionDTO;
    }
}
