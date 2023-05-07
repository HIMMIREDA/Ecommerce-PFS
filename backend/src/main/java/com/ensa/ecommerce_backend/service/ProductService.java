package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.request.UpdateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    ProductDto saveProduct(AddProductRequest addProductRequest);

    void deleteProductById(Long id);

    ProductDto updateProductById(Long id, UpdateProductRequest updateProductRequest);

    Page<ProductDto> getAllProducts(int numPage, int pageCount, String query);

    ProductDto getProductById(Long id);

    ProductDto addImageToProduct(Long productId, MultipartFile image);

    void deleteImageFromProduct(Long productId, String imageId);
}
