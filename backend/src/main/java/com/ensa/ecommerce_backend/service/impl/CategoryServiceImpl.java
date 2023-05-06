package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.repository.CategoryRepository;
import com.ensa.ecommerce_backend.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public void saveCategory(CategoryEntity category) {
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.delete(getCategoryById(id));
    }

    @Override
    public void updateCategory(Long id, CategoryEntity category) {
        Optional<CategoryEntity> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            CategoryEntity updatedCategory = existingCategory.get();
            updatedCategory.setName(category.getName());
            updatedCategory.setDescription(category.getDescription());
            updatedCategory.setParentCategory(category.getParentCategory());
            updatedCategory.setSubCategories(category.getSubCategories());
            updatedCategory.setProducts(category.getProducts());
            updatedCategory.setBrands(category.getBrands());
            categoryRepository.save(updatedCategory);
        } else {
            throw new IllegalArgumentException("Category with ID " + id + " not found");
        }
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category Not Found"));
    }

    @Override
    public void addSubCategory(CategoryEntity category, CategoryEntity subCategory) {
        if(category.getSubCategories().size()>=2){
            throw new IllegalStateException("A Category can have at most 2 subcategories.");
        }
        category.getSubCategories().add(subCategory);
        subCategory.setParentCategory(category);
    }
}
