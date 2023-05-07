package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.request.UpdateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductDto saveProduct(AddProductRequest addProductRequest);
    void deleteProductById(Long id);
    ProductDto updateProductById(Long id, UpdateProductRequest updateProductRequest);
    Page<ProductDto> getAllProducts(int numPage, int pageCount);
    ProductDto getProductById(Long id);
     ProductDto addImageToProduct(Long productId,MultipartFile image);
    void deleteImageFromProduct(Long productId,String imageId);
}
