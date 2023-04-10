package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.ProductImageDTO;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.StoringImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductRestController {

    private StoringImageService storingImageService;

    private ProductService productService;

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

    @PostMapping("/addImageToProduct")
    public ResponseEntity<ProductImageDTO> addImageToProduct(@RequestBody ProductImageDTO productImageDTO) {
        ProductImageDTO product = productService.addImageToProduct(productImageDTO);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/saveProduct")
    public ResponseEntity<ProductEntity> saveProduct(@RequestBody ProductEntity product) {
        ProductEntity savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }


}
