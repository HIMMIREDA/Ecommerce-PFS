package com.ensa.ecommerce_backend.DTO;

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

    private BrandDto brand;
    private CategoryDto category1;
    private CategoryDto category2;
    private CategoryDto category3;

    private List<String> images;
}
