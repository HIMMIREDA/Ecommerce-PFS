package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.ProductImageDTO;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ProductItemEntity;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import com.ensa.ecommerce_backend.service.CategoryService;
import com.ensa.ecommerce_backend.service.ProductItemServiceImpl;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.StoringImageServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProductRestController {

    private StoringImageServiceImpl storingImageService;

    private ProductItemServiceImpl productItemService;

    private ProductService productService;

    private CategoryService categoryService;

    ///////////IMAGE///////////

    @PostMapping("/fileSystem")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = storingImageService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/fileSystem/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] imageData=storingImageService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

    ///////////PRODUCT ITEM///////////

    @PostMapping("/addImageToProductItem")
    public ResponseEntity<ProductImageDTO> addImageToProductItem(@RequestBody ProductImageDTO productImageDTO) {
        ProductImageDTO product = productItemService.addImageToProduct(productImageDTO);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/saveProductItem")
    public void saveProductItem(@RequestBody ProductItemEntity product) {
    productItemService.saveProduct(product);
    }

    @GetMapping("/productItems")
    public List<ProductItemEntity> getAllProductItems() {
        return productItemService.getAllProducts();
    }

    @GetMapping("/productItems/{id}")
    public ProductItemEntity getProductItemById(@PathVariable Long id) {
        return productItemService.getProductById(id);
    }

    @DeleteMapping("/deleteProductItem/{id}")
    public ResponseEntity<String> deleteProductItem(@PathVariable("id") Long id){
        productItemService.deleteProductById(id);
        return ResponseEntity.ok().body("Product item with ID " + id + " has been deleted.");
    }


    @PutMapping("/updateProductItem/{id}")
    public ResponseEntity<String> updateProductItem(@PathVariable("id") Long id, @RequestBody ProductItemEntity productItem) {
        productItemService.updateProductById(id, productItem);
        return ResponseEntity.ok().body("Product item with ID " + id + " has been updated.");
    }


    ///////////CATEGORY///////////

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @GetMapping("/categories")
    public List<CategoryEntity> getAllBrands() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/saveCategory")
    public ResponseEntity<String> saveCategory(@RequestBody CategoryEntity category) {

        categoryService.saveCategory(category);
        return ResponseEntity.ok().body("Category with ID " + category.getId() + " has been saved.");
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body("Category with ID " + id + " has been deleted.");
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable("id") Long id, @RequestBody CategoryEntity category) {
        categoryService.updateCategory(id, category);
        return ResponseEntity.ok().body("Category with ID " + id + " has been updated.");
    }
    ///////////PRODUCT///////////
    @PostMapping("/saveProduct")
    public ResponseEntity<String> saveProduct(@RequestBody ProductEntity product) {
        productService.saveProduct(product);
        return ResponseEntity.ok().body("Product with ID " + product.getId() + " has been saved.");
    }

    @GetMapping("/products")
    public List<ProductEntity> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id){
        productService.deleteProductById(id);
        return ResponseEntity.ok().body("Product with ID " + id + " has been deleted.");
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Long id, @RequestBody ProductEntity product) {
        productService.updateProductById(id, product);
        return ResponseEntity.ok().body("Product with ID " + id + " has been updated.");
    }

}
