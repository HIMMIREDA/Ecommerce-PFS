package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    ProductEntity saveProduct(AddProductRequest addProductRequest);
    void deleteProductById(Long id);
    void updateProductById(Long id, ProductEntity product);
    Page<ProductEntity> getAllProducts(int numPage, int pageCount);
    ProductEntity getProductById(Long id);
}
