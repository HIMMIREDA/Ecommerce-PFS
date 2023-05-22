package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.ImageDto;
import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {
    static public ProductDto toDto(ProductEntity product) {
        List<ImageDto> images = product.getImages().stream()
                .map(ImageMapper::toDto)
                .collect(Collectors.toList());

        CategoryEntity secondLvlCategory = product.getCategory().getParentCategory().toBuilder()
                .subCategories(Collections.singletonList(product.getCategory())).build();
        CategoryEntity firstLvlCategory = product.getCategory().getParentCategory().getParentCategory().toBuilder()
                .subCategories(Collections.singletonList(secondLvlCategory)).build();
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .quantity(product.getQuantity())
                .price(product.getPrice())
                .images(images)
                .brand(BrandMapper.toDto(product.getBrand()))
                .category(CategoryMapper.toDto(firstLvlCategory))
                .build();
    }
}
