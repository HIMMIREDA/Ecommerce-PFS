package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.BrandDto;
import com.ensa.ecommerce_backend.entity.BrandEntity;

public class BrandMapper {

    static public BrandDto mapBrandEntityToBrandDto(BrandEntity brand) {
        return brand == null ? null :
                BrandDto.builder()
                        .id(brand.getId())
                        .image(brand.getName())
                        .name(brand.getName())
                        .build();
    }
}
