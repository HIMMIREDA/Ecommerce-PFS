package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.ProductImageDTO;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.service.CategoryService;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.StoringImageService;
import com.ensa.ecommerce_backend.response.getProductsResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductRestController {

    private StoringImageService storingImageService;

    private ProductService productService;

    private CategoryService categoryService;

    ///////////IMAGE///////////


    /*
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
    */


    ///////////CATEGORY///////////

    /* @GetMapping("/categories/{id}")
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
     */

    ///////////PRODUCT///////////
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> saveProduct(@ModelAttribute @Valid AddProductRequest addProductRequest, BindingResult bindingResult) throws MethodArgumentNotValidException {
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException((MethodParameter) null, bindingResult);
        }
        ProductEntity product = productService.saveProduct(addProductRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product with ID " + product.getId() + " has been saved.");
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<getProductsResponse> getAllProducts(@RequestParam(value = "page",defaultValue = "1") int numPage, @RequestParam(value = "count",defaultValue = "10") int count) {
        Page<ProductEntity> productsPage = productService.getAllProducts(numPage - 1,count);
        return ResponseEntity.ok(
                getProductsResponse.builder()
                        .products(productsPage.getContent().stream().map(ProductMapper::mapProductEntityToProductDto).collect(Collectors.toList()))
                        .currentPage(productsPage.getNumber() + 1)
                        .totalItems(productsPage.getTotalElements())
                        .totalPages(productsPage.getTotalPages())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok().body("Product with ID " + id + " has been deleted.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Long id, @RequestBody ProductEntity product) {
        productService.updateProductById(id, product);
        return ResponseEntity.ok().body("Product with ID " + id + " has been updated.");
    }

    /*
    @PostMapping("/addImageToProductItem")
    public ResponseEntity<ProductImageDTO> addImageToProductItem(@RequestBody ProductImageDTO productImageDTO) {
        //ProductImageDTO product = productService.addImageToProduct(productImageDTO);
        //return ResponseEntity.ok(product);
    }*/

}
