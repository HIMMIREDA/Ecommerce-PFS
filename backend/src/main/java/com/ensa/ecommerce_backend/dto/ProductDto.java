package com.ensa.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Integer quantity;
    private Double price;
    private Integer meanRating;

    private BrandDto brand;
    private CategoryDto category;

    private List<ImageDto> images;
}
