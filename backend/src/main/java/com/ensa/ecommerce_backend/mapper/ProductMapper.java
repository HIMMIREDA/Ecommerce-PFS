package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.ImageDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.ProductEntity;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {
    static public ProductDto mapProductEntityToProductDto(ProductEntity product) {
        List<ImageDto> images = product.getImages().stream()
                .map(ImageMapper::mapImageEntityToImageDto)
                .collect(Collectors.toList());

        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .quantity(product.getQuantity())
                .price(product.getPrice())
                .images(images)
                .brand(BrandMapper.mapBrandEntityToBrandDto(product.getBrand()))
                .category(CategoryMapper.mapCategoryEntityToCategoryDto(product.getCategory().getParentCategory().getParentCategory()))
                .build();
    }
}
