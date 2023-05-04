package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;

import java.util.List;

public interface ProductService {
    void saveProduct(ProductEntity product);
    void deleteProductById(Long id);
    void updateProductById(Long id, ProductEntity product);
    List<ProductEntity> getAllProducts();
    ProductEntity getProductById(Long id);
}
