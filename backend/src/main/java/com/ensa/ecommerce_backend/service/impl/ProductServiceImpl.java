package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.exception.CategoryNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.UploadFileException;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.BrandRepository;
import com.ensa.ecommerce_backend.repository.CategoryRepository;
import com.ensa.ecommerce_backend.repository.ImageRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.StoringImageService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private StoringImageService storingImageService;
    private ImageRepository imageRepository;
    private CategoryRepository categoryRepository;
    private BrandRepository brandRepository;


    @Override
    public ProductEntity saveProduct(AddProductRequest addProductRequest) {
        ProductEntity product = ProductMapper.mapAddProductRequestToProductEntity(addProductRequest);
        BrandEntity brand = null;
        if (addProductRequest.getBrandName() != null) {
            brand = brandRepository.findBrandEntityByName(addProductRequest.getBrandName()).orElse(null);
        }
//        CategoryEntity category = categoryRepository.findCategoryEntityByName(addProductRequest.getCategoryName()).orElseThrow(() -> new CategoryNotFoundException("category : " + addProductRequest.getCategoryName() + " not found"));
        CategoryEntity category = categoryRepository.findCategoryEntityByName(addProductRequest.getCategoryName()).orElse(null);

        product.setBrand(brand);
        product.setCategory(category);

        // save images
        product.setImages(Arrays.stream(addProductRequest.getImages()).map(image -> {
            try {
                ImageEntity imageEntity = storingImageService.uploadImageToFileSystem(image);
                imageEntity.setProduct(product);
                return imageEntity;
            } catch (IOException e) {
                throw new UploadFileException("error while uploading files");
            }
        }).collect(Collectors.toList()));
        return productRepository.save(product);
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
            updatedProduct.setCategory(product.getCategory());
            updatedProduct.setDescription(product.getDescription());
            productRepository.save(updatedProduct);
        } else {
            throw new IllegalArgumentException("Product with ID " + id + " not found");
        }
    }

    @Override
    public Page<ProductEntity> getAllProducts(int numPage, int pageCount) {
        Pageable paging = PageRequest.of(numPage, pageCount);
        return productRepository.findAll(paging);
    }

    @Override
    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> {
            throw new ProductNotFoundException("Product with id : " + id + " not found");
        });
    }
}
