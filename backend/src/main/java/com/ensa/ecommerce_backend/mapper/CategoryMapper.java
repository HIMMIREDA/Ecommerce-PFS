package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.CategoryDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;

import java.util.ArrayList;

public class CategoryMapper {

    static public CategoryDto mapCategoryEntityToCategoryDto(CategoryEntity category) {

        return category == null ? null : CategoryDto.builder()
                .id(category.getId())
                .description(category.getDescription())
                .name(category.getName())
                .subCategories(category.getSubCategories() == null ? new ArrayList<>() :
                        category.getSubCategories().stream().map(CategoryMapper::mapCategoryEntityToCategoryDto).toList())
                .build();
    }
}
