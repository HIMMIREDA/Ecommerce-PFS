package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.CategoryDto;
import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.request.AddCategoryRequest;
import com.ensa.ecommerce_backend.request.UpdateCategoryRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAllCategories();

    CategoryDto saveParentCategory(AddCategoryRequest addCategoryRequest);

    CategoryDto saveChildCategory(Long parentCategoryId, AddCategoryRequest addCategoryRequest);

    CategoryDto updateCategory(Long id, UpdateCategoryRequest updateCategoryRequest);

    void deleteCategoryById(Long id);

    CategoryDto getCategoryById(Long id);

    Page<CategoryDto> getGrandChildCategories(int numPage, int pageCount, String all);

    Page<ProductDto> getCategoryProducts(Long id, int numPage, int pageCount);
}
