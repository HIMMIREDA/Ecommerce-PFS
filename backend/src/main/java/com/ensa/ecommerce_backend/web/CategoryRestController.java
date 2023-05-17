package com.ensa.ecommerce_backend.web;


import com.ensa.ecommerce_backend.DTO.CategoryDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.request.AddCategoryRequest;
import com.ensa.ecommerce_backend.request.UpdateCategoryRequest;
import com.ensa.ecommerce_backend.response.GetItemsResponse;
import com.ensa.ecommerce_backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@AllArgsConstructor
public class CategoryRestController {
    private CategoryService categoryService;

    // get all categories ( parent  + children + grandchildren's)
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // get grandchildren categories
    @GetMapping("/grandchilds")
    public ResponseEntity<GetItemsResponse<CategoryDto>> getGrandChildCategories(@RequestParam(value = "page", defaultValue = "1") int numPage, @RequestParam(value = "count", defaultValue = "10") int count, @RequestParam(required = false) String all) {
        Page<CategoryDto> categoriesPage = categoryService.getGrandChildCategories(numPage - 1, count, all);
        return ResponseEntity.ok(
                GetItemsResponse.<CategoryDto>builder()
                        .items(categoriesPage.getContent())
                        .currentPage(categoriesPage.getNumber() + 1)
                        .totalItems(categoriesPage.getTotalElements())
                        .totalPages(categoriesPage.getTotalPages())
                        .build()
        );
    }

    // create a new top level category
    @PostMapping
    public ResponseEntity<CategoryDto> saveParentCategory(@RequestBody @Valid AddCategoryRequest addCategoryRequest) {
        CategoryDto categoryDto = categoryService.saveParentCategory(addCategoryRequest);
        return new ResponseEntity<>(categoryDto, HttpStatus.CREATED);
    }

    // create 2nd and 3rd lvl category
    @PostMapping("/{parentCategoryId}")
    public ResponseEntity<CategoryDto> saveChildCategory(@PathVariable Long parentCategoryId, @RequestBody @Valid AddCategoryRequest addCategoryRequest) {
        CategoryDto categoryDto = categoryService.saveChildCategory(parentCategoryId, addCategoryRequest);
        return new ResponseEntity<>(categoryDto, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable("id") Long id, @RequestBody @Valid UpdateCategoryRequest updateCategoryRequest) {
        return ResponseEntity.ok(categoryService.updateCategory(id, updateCategoryRequest));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        categoryService.deleteCategoryById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

    // get products of a category
    @GetMapping("/{id}/products")
    public ResponseEntity<GetItemsResponse<ProductDto>> getCategoryProducts(@PathVariable Long id, @RequestParam(value = "page", defaultValue = "1") int numPage, @RequestParam(value = "count", defaultValue = "10") int count) {
        Page<ProductDto> productsPage = categoryService.getCategoryProducts(id, numPage - 1, count);
        return ResponseEntity.ok(
                GetItemsResponse.<ProductDto>builder()
                        .items(productsPage.getContent())
                        .currentPage(productsPage.getNumber() + 1)
                        .totalItems(productsPage.getTotalElements())
                        .totalPages(productsPage.getTotalPages())
                        .build()
        );
    }

}
