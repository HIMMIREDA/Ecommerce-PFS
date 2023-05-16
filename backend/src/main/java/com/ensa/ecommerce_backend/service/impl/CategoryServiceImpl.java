package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.CategoryDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.exception.CategoryNotFoundException;
import com.ensa.ecommerce_backend.exception.InvalidCategoryLevelException;
import com.ensa.ecommerce_backend.mapper.CategoryMapper;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.CategoryRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.request.AddCategoryRequest;
import com.ensa.ecommerce_backend.request.UpdateCategoryRequest;
import com.ensa.ecommerce_backend.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    @Override
    public CategoryDto saveParentCategory(AddCategoryRequest addCategoryRequest) {
        CategoryEntity category = CategoryEntity.builder()
                .name(addCategoryRequest.getName())
                .description(addCategoryRequest.getDescription())
                .parentCategory(null)
                .build();

        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryDto updateCategory(Long id, UpdateCategoryRequest updateCategoryRequest) {
        CategoryEntity category = categoryRepository.findById(id).orElseThrow(
                () -> new CategoryNotFoundException("category with id: " + id + " not found")
        );
        category.setName(Objects.requireNonNullElse(updateCategoryRequest.getName(), category.getName()));
        category.setDescription(Objects.requireNonNullElse(updateCategoryRequest.getDescription(), category.getDescription()));

        return CategoryMapper.toDto(categoryRepository.save(category));
    }


    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findCategoryEntityByParentCategoryNull().stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDto> getGrandChildCategories(int numPage, int pageCount, String all) {
        Pageable pageable = PageRequest.of(numPage, pageCount);
        if(all.equalsIgnoreCase("true")){
            pageable = Pageable.unpaged();
        }
        return categoryRepository.findGrandChildCategories(pageable).map(CategoryMapper::toDto);
    }

    @Override
    public Page<ProductDto> getCategoryProducts(Long id, int numPage, int pageCount) {
        Pageable pageable = PageRequest.of(numPage, pageCount);
        return productRepository.findProductEntitiesByCategoryId(id, pageable).map(ProductMapper::toDto);
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        CategoryEntity category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("category with id : " + id + " not found"));
        return CategoryMapper.toDto(category);
    }

    @Override
    public CategoryDto saveChildCategory(Long parentCategoryId, AddCategoryRequest addCategoryRequest) {
        CategoryEntity parentCategory = categoryRepository.findById(parentCategoryId).orElseThrow(
                () -> new CategoryNotFoundException("category with id: " + parentCategoryId + " not found")
        );


        if (!isFirstLevelCategory(parentCategory) && !isSecondLevelCategory(parentCategory)) {
            throw new InvalidCategoryLevelException("category with id: " + parentCategoryId + " cant be a parent category");
        }

        CategoryEntity childCategory = CategoryEntity.builder()
                .name(addCategoryRequest.getName())
                .description(addCategoryRequest.getDescription())
                .parentCategory(parentCategory)
                .build();

        parentCategory.getSubCategories().add(childCategory);

        return CategoryMapper.toDto(categoryRepository.save(childCategory));
    }

    private boolean isFirstLevelCategory(CategoryEntity category) {
        return category.getParentCategory() == null;
    }

    private boolean isSecondLevelCategory(CategoryEntity category) {
        return category.getParentCategory() != null && isFirstLevelCategory(category.getParentCategory());
    }
}
