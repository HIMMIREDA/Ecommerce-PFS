package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;

    @Override
    public void saveProduct(ProductEntity product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public void updateProductById(Long id, ProductEntity product) {
        Optional<ProductEntity> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            ProductEntity updatedProduct = existingProduct.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setBrand(product.getBrand());
            updatedProduct.setProductItems(product.getProductItems());
            updatedProduct.setCategory(product.getCategory());
            updatedProduct.setDescription(product.getDescription());
            productRepository.save(updatedProduct);
        } else {
            throw new IllegalArgumentException("Product with ID " + id + " not found");
        }
    }

    @Override
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ProductEntity getProductById(Long id) {
        return getProductById(id);
    }
}
