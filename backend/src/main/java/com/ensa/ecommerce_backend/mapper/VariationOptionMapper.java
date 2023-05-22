package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.VariationDTO;
import com.ensa.ecommerce_backend.DTO.VariationOptionDTO;
import com.ensa.ecommerce_backend.entity.VariationEntity;
import com.ensa.ecommerce_backend.entity.VariationOptionEntity;
import org.springframework.beans.BeanUtils;

public class VariationOptionMapper {
    public static VariationOptionDTO mapVariationEntitytoVariationOptionDTO(VariationOptionEntity variationOptionEntity){
        VariationOptionDTO variationOptionDTO = new VariationOptionDTO();
        BeanUtils.copyProperties(variationOptionEntity,variationOptionDTO);
        return variationOptionDTO;
    }
}
