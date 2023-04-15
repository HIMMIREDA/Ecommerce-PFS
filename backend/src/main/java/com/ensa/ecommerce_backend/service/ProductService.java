package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ProductImageDTO;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import com.ensa.ecommerce_backend.repository.ProductImageRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;

    private ProductImageRepository productImageRepository;

    public ProductImageDTO addImageToProduct(ProductImageDTO productImageDTO){
        ProductEntity product = productRepository.findById(productImageDTO.getProductId()).orElseThrow(()->new RuntimeException("Product not Found"));
        ProductImageEntity image = productImageRepository.findById(productImageDTO.getImageId()).orElseThrow(() -> new RuntimeException("Image not found"));
        image.setProduct(product);
        product.getProductImages().add(image);
        productRepository.save(product);
        return productImageDTO;
    }

    public ProductEntity saveProduct(ProductEntity product) {
        productRepository.save(product);
        return product;
    }

    public List<ProductEntity> getAllProducts(){
        return productRepository.findAll();
    }

    public ProductEntity getProductById(Long id){
        ProductEntity product = productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not Found"));
        return product;
    }


}
