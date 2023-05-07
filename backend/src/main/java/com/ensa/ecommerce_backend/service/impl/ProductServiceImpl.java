package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.exception.ProductImageArraySizeException;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.BrandRepository;
import com.ensa.ecommerce_backend.repository.CategoryRepository;
import com.ensa.ecommerce_backend.repository.ImageRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.request.UpdateProductRequest;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.ImageService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private ImageService imageService;
    private ImageRepository imageRepository;
    private CategoryRepository categoryRepository;
    private BrandRepository brandRepository;


    @Override
    public ProductDto saveProduct(AddProductRequest addProductRequest) {
        ProductEntity product = ProductMapper.mapAddProductRequestToProductEntity(addProductRequest);
        BrandEntity brand = null;
        if (addProductRequest.getBrandName() != null) {
            brand = brandRepository.findBrandEntityByName(addProductRequest.getBrandName()).orElse(null);
        }
        //CategoryEntity category = categoryRepository.findCategoryEntityByName(addProductRequest.getCategoryName()).orElseThrow(() -> new CategoryNotFoundException("category with name : " + addProductRequest.getCategoryName() + " not found"));
        CategoryEntity category = categoryRepository.findCategoryEntityByName(addProductRequest.getCategoryName()).orElse(null);

        product.setBrand(brand);
        product.setCategory(category);

        // save images
        product.setImages(Arrays.stream(addProductRequest.getImages()).map(image -> {
                            ImageEntity imageEntity = imageService.uploadImageToFileSystem(image);
                            imageEntity.setProduct(product);
                            return imageEntity;
                        })
                        .collect(Collectors.toList())
        );
        return ProductMapper.mapProductEntityToProductDto(productRepository.save(product));
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDto updateProductById(Long id, UpdateProductRequest updateProductRequest) {
        ProductEntity product = productRepository.findById(id).orElseThrow(
                () -> new ProductNotFoundException("product with id: " + id + " not found")
        );
        //CategoryEntity category = categoryRepository.findCategoryEntityByName(updateProductRequest.getCategoryName()).orElseThrow(() -> new CategoryNotFoundException("category with name: " + updateProductRequest.getCategoryName() + " not found"));
        CategoryEntity category = categoryRepository.findCategoryEntityByName(updateProductRequest.getCategoryName()).orElse(null);
        BrandEntity brand = brandRepository.findBrandEntityByName(updateProductRequest.getBrandName()).orElse(null);
        product.setName(updateProductRequest.getName());
        product.setDescription(updateProductRequest.getDescription());
        product.setQuantity(updateProductRequest.getQuantity());
        product.setPrice(updateProductRequest.getPrice());
        product.setCategory(category);
        product.setBrand(brand);

        return ProductMapper.mapProductEntityToProductDto(productRepository.save(product));
    }

    @Override
    public Page<ProductDto> getAllProducts(int numPage, int pageCount) {
        Pageable paging = PageRequest.of(numPage, pageCount);
        return productRepository.findAll(paging).map(ProductMapper::mapProductEntityToProductDto);
    }

    @Override
    public ProductDto addImageToProduct(Long productId, MultipartFile image) {
        ProductEntity product = productRepository.findById(productId).orElseThrow(
                () -> new ProductNotFoundException("product with id: " + productId + " not found")
        );
        if (product.getImages().size() >= 5) {
            throw new ProductImageArraySizeException("product cant have more than 5 images, please remove image before adding new one.");
        }
        ImageEntity imageEntity = imageService.uploadImageToFileSystem(image);
        imageEntity.setProduct(product);
        product.getImages().add(imageEntity);
        return ProductMapper.mapProductEntityToProductDto(productRepository.save(product));
    }

    @Override
    public void deleteImageFromProduct(Long productId, String imageId) {
        ProductEntity product = productRepository.findById(productId).orElseThrow(
                () -> new ProductNotFoundException("product with id: " + productId + " not found")
        );

        if (product.getImages().stream().noneMatch(imageEntity -> imageEntity.getId().toString().equals(imageId))) {
            return;
        }

        product.getImages().removeIf(imageEntity -> imageEntity.getId().toString().equals(imageId));

        productRepository.save(product);
        imageRepository.deleteById(UUID.fromString(imageId));
    }

    @Override
    public ProductDto getProductById(Long id) {
        return ProductMapper.mapProductEntityToProductDto(
                productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id : " + id + " not found"))
        );
    }
}
