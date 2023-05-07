package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.request.AddProductRequest;
import com.ensa.ecommerce_backend.request.UpdateProductRequest;
import com.ensa.ecommerce_backend.response.GetItemsResponse;
import com.ensa.ecommerce_backend.service.CategoryService;
import com.ensa.ecommerce_backend.service.ImageService;
import com.ensa.ecommerce_backend.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductRestController {

    private ImageService imageService;

    private ProductService productService;

    private CategoryService categoryService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProductDto> saveProduct(@ModelAttribute @Valid AddProductRequest addProductRequest, BindingResult bindingResult) throws MethodArgumentNotValidException {
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException((MethodParameter) null, bindingResult);
        }
        ProductDto productDto = productService.saveProduct(addProductRequest);

        return new ResponseEntity<>(productDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<GetItemsResponse<ProductDto>> getAllProducts(@RequestParam(value = "page", defaultValue = "1") int numPage, @RequestParam(value = "count", defaultValue = "10") int count, @RequestParam(value = "query", defaultValue = "") String query) {
        Page<ProductDto> productsPage = productService.getAllProducts(numPage - 1, count, query);
        return ResponseEntity.ok(
                GetItemsResponse.<ProductDto>builder()
                        .items(productsPage.getContent())
                        .currentPage(productsPage.getNumber() + 1)
                        .totalItems(productsPage.getTotalElements())
                        .totalPages(productsPage.getTotalPages())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProductById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long id, @RequestBody @Valid UpdateProductRequest updateProductRequest) {
        return ResponseEntity.ok(productService.updateProductById(id, updateProductRequest));
    }


    @PostMapping("/{productId}/images")
    public ResponseEntity<Object> addImageToProduct(@PathVariable Long productId, @RequestParam("image") @NotNull MultipartFile image) {
        ProductDto productDto = productService.addImageToProduct(productId, image);
        Map<String, Object> response = new HashMap<>();
        response.put("images", productDto.getImages());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{productId}/images/{imageId}")
    public ResponseEntity<Object> addImageToProduct(@PathVariable Long productId, @PathVariable String imageId) {
        productService.deleteImageFromProduct(productId, imageId);
        Map<String, Object> response = new HashMap<>();
        response.put("id", imageId);
        return ResponseEntity.ok(response);
    }

}
