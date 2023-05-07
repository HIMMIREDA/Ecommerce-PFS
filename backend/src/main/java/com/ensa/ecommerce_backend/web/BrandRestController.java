package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.BrandDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.request.AddBrandRequest;
import com.ensa.ecommerce_backend.request.UpdateBrandRequest;
import com.ensa.ecommerce_backend.response.GetItemsResponse;
import com.ensa.ecommerce_backend.service.BrandService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/brands")
@AllArgsConstructor
public class BrandRestController {

    private BrandService brandService;

    @GetMapping
    public ResponseEntity<GetItemsResponse<BrandDto>> getBrands(@RequestParam(value = "page", defaultValue = "1") int numPage, @RequestParam(value = "count", defaultValue = "10") int count) {
        Page<BrandDto> brandPage = brandService.getAllBrands(numPage - 1, count);
        return ResponseEntity.ok(
                GetItemsResponse.<BrandDto>builder()
                        .items(brandPage.getContent())
                        .currentPage(brandPage.getNumber() + 1)
                        .totalItems(brandPage.getTotalElements())
                        .totalPages(brandPage.getTotalPages())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BrandDto> saveBrand(@ModelAttribute @Valid AddBrandRequest addBrandRequest, BindingResult bindingResult) throws MethodArgumentNotValidException {
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException((MethodParameter) null, bindingResult);
        }
        BrandDto brandDto = brandService.saveBrand(addBrandRequest);

        return new ResponseEntity<>(brandDto, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BrandDto> updateProduct(@PathVariable("id") Long id, @ModelAttribute @Valid UpdateBrandRequest updateProductRequest, BindingResult bindingResult) throws MethodArgumentNotValidException {
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException((MethodParameter) null, bindingResult);
        }
        return ResponseEntity.ok(brandService.updateBrandById(id, updateProductRequest));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        brandService.deleteBrandById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{brandId}/products")
    public ResponseEntity<GetItemsResponse<ProductDto>> getBrandProducts(@PathVariable("brandId") Long brandId, @RequestParam(value = "page", defaultValue = "1") int numPage, @RequestParam(value = "count", defaultValue = "10") int count) {
        Page<ProductDto> productsPage = brandService.getBrandProducts(brandId, numPage - 1, count);
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
