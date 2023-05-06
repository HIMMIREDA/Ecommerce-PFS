package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.CategoryDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CategoryMapper {

    static public CategoryDto mapCategoryEntityToCategoryDto(CategoryEntity category) {

        return category == null ? null :
                CategoryDto.builder()
                        .id(category.getId())
                        .description(category.getDescription())
                        .name(category.getName())
                        .build();
    }
}
