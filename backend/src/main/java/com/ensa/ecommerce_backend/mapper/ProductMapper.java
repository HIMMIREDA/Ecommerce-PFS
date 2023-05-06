package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {
    static public ProductEntity mapAddProductRequestToProductEntity(AddProductRequest productRequest) {
        return ProductEntity.builder().name(productRequest.getName()).description(productRequest.getDescription()).quantity(productRequest.getQuantity()).price(productRequest.getPrice()).build();
    }

    private static String getBaseUrl() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int port = request.getServerPort();
        return scheme + "://" + serverName + ":" + port;
    }

    static public ProductDto mapProductEntityToProductDto(ProductEntity product) {
        CategoryEntity category3 = product.getCategory() == null ? null : product.getCategory();
        CategoryEntity category2 = category3 == null ? null : category3.getParentCategory();
        CategoryEntity category1 = category2 == null ? null : category2.getParentCategory().getParentCategory();
        List<String> images = product.getImages().stream().map(
                image -> getBaseUrl() + "/api/images/" + image.getId() + "." + image.getExtension()
        ).collect(Collectors.toList());

        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .quantity(product.getQuantity())
                .price(product.getPrice())
                .images(images)
                .brand(BrandMapper.mapBrandEntityToBrandDto(product.getBrand()))
                .category1(CategoryMapper.mapCategoryEntityToCategoryDto(category1))
                .category2(CategoryMapper.mapCategoryEntityToCategoryDto(category2))
                .category3(CategoryMapper.mapCategoryEntityToCategoryDto(category3))
                .build();
    }
}
