package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.CategoryEntity;
import jdk.jfr.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    void saveCategory(CategoryEntity category);

    void deleteCategory(Long id);

    void updateCategory(Long id, CategoryEntity category);

    List<CategoryEntity> getAllCategories();

    CategoryEntity getCategoryById(Long id);

    void addSubCategory(CategoryEntity category, CategoryEntity subCategory);

}
