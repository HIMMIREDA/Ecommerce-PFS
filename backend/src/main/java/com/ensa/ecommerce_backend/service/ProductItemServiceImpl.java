package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ProductImageDTO;
import com.ensa.ecommerce_backend.entity.ProductItemEntity;
import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.repository.ImageRepository;
import com.ensa.ecommerce_backend.repository.ProductItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductItemServiceImpl {

    private ProductItemRepository productItemRepository;

    private ImageRepository imageRepository;

    public void saveProduct(ProductItemEntity product) {
        productItemRepository.save(product);
    }

    public void deleteProductById(Long id){
        productItemRepository.deleteById(id);
    }

    public void updateProductById(Long id, ProductItemEntity productItem){
        Optional<ProductItemEntity> existingProductItem = productItemRepository.findById(id);
        if (existingProductItem.isPresent()) {
            ProductItemEntity updatedProductItem = existingProductItem.get();
            updatedProductItem.setPrice(productItem.getPrice());
            updatedProductItem.setQuantity(productItem.getQuantity());
            updatedProductItem.setDescription(productItem.getDescription());
            updatedProductItem.setProduct(productItem.getProduct());
            updatedProductItem.setProductImages(productItem.getProductImages());
            productItemRepository.save(updatedProductItem);
        } else {
            throw new IllegalArgumentException("Product Item with ID " + id + " not found");
        }
    }

    public List<ProductItemEntity> getAllProducts(){
        return productItemRepository.findAll();
    }

    public ProductItemEntity getProductById(Long id){
        ProductItemEntity product = productItemRepository.findById(id).orElseThrow(()->new RuntimeException("Product not Found"));
        return product;
    }

    public ProductImageDTO addImageToProduct(ProductImageDTO productImageDTO){
        ProductItemEntity product = productItemRepository.findById(productImageDTO.getProductId()).orElseThrow(()->new RuntimeException("Product not Found"));
        ImageEntity image = imageRepository.findById(productImageDTO.getImageId()).orElseThrow(() -> new RuntimeException("Image not found"));
        image.setProduct(product);
        product.getProductImages().add(image);
        productItemRepository.save(product);
        return productImageDTO;
    }




}
