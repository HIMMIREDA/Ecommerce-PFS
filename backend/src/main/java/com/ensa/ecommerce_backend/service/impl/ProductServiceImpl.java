package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.dto.ProductSearchDto;
import com.ensa.ecommerce_backend.entity.*;
import com.ensa.ecommerce_backend.exception.*;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.*;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.request.UpdateProductRequest;
import com.ensa.ecommerce_backend.search.SearchCriteria;
import com.ensa.ecommerce_backend.search.product.ProductSpecificationBuilder;
import com.ensa.ecommerce_backend.service.ImageService;
import com.ensa.ecommerce_backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
    static private final List<String> sortByFieldsList = Arrays.asList(
            "createdAt",
            "name",
            "price"
    );
    private ProductRepository productRepository;
    private ImageService imageService;
    private ImageRepository imageRepository;
    private CategoryRepository categoryRepository;
    private BrandRepository brandRepository;
    private UserRepository userRepository;


    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(ProductMapper::toDto).toList();
    }

    @Override
    public void reduceProductsQuantity(CartEntity cart) {
        // reduce product Quantity
        cart.getCartItems().forEach(cartItemEntity -> {
            ProductEntity product = productRepository.findById(cartItemEntity.getProduct().getId()).orElseThrow(ProductNotFoundException::new);
            if (product.getQuantity() < cartItemEntity.getQuantity()) {
                throw new ProductQuantityException();
            }
            product.setQuantity(product.getQuantity() - cartItemEntity.getQuantity());
            productRepository.save(product);
        });
    }

    @Override
    public ProductDto saveProduct(AddProductRequest addProductRequest) {
        ProductEntity product = ProductEntity.builder()
                .name(addProductRequest.getName())
                .description(addProductRequest.getDescription())
                .quantity(addProductRequest.getQuantity())
                .price(addProductRequest.getPrice())
                .build();

        BrandEntity brand = null;
        if (addProductRequest.getBrandName() != null) {
            brand = brandRepository.findBrandEntityByName(addProductRequest.getBrandName()).orElse(null);
        }
        CategoryEntity category = categoryRepository.findCategoryEntityByName(addProductRequest.getCategoryName()).orElseThrow(() -> new CategoryNotFoundException("category with name : " + addProductRequest.getCategoryName() + " not found")
        );

        // category is 1st or 2nd lvl category
        if (category.getParentCategory() == null || category.getParentCategory().getParentCategory() == null) {
            throw new InvalidCategoryLevelException(
                    "category must be a 3rd level category"
            );
        }

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
        return ProductMapper.toDto(productRepository.save(product));
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

        product.setName(Objects.requireNonNullElse(updateProductRequest.getName(), product.getName()));
        product.setDescription(Objects.requireNonNullElse(updateProductRequest.getDescription(), product.getDescription()));
        product.setQuantity(Objects.requireNonNullElse(updateProductRequest.getQuantity(), product.getQuantity()));
        product.setPrice(Objects.requireNonNullElse(updateProductRequest.getPrice(), product.getPrice()));

        if (updateProductRequest.getBrandName() != null) {
            BrandEntity brand = brandRepository.findBrandEntityByName(updateProductRequest.getBrandName()).orElse(null);
            product.setBrand(brand);
        }

        if (updateProductRequest.getCategoryName() != null) {
            CategoryEntity category = categoryRepository.findCategoryEntityByName(updateProductRequest.getCategoryName()).orElseThrow(() -> new CategoryNotFoundException("category with name: " + updateProductRequest.getCategoryName() + " not found"));
            product.setCategory(category);
        }

        return ProductMapper.toDto(productRepository.save(product));
    }

    @Override
    public Page<ProductDto> getPaginatedProducts(int numPage, int pageCount, ProductSearchDto productSearchDto, String sortBy, String sortOrder) {
        ProductSpecificationBuilder builder = new ProductSpecificationBuilder();
        if (productSearchDto != null) {
            List<SearchCriteria> criteriaList = productSearchDto.getSearchCriteriaList();
            if (criteriaList != null) {
                criteriaList.forEach(x -> {
                    x.setDataOption(productSearchDto.getDataOption());
                    builder.with(x);
                });
            }
        }
        Sort sortCriteria = Sort.by(Sort.Direction.DESC, "createdAt");
        if (sortByFieldsList.contains(sortBy)) {
            sortCriteria = Sort.by(sortOrder.equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        }
        Pageable paging = PageRequest.of(numPage, pageCount, sortCriteria);
        Page<ProductEntity> pageOfProducts = productSearchDto == null ? productRepository.findAll(paging) : productRepository.findAll(builder.build(), paging);
        return pageOfProducts.map(ProductMapper::toDto);
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
        return ProductMapper.toDto(productRepository.save(product));
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
        return ProductMapper.toDto(
                productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id : " + id + " not found"))
        );
    }
}
