package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.ProductItemEntity;
import com.ensa.ecommerce_backend.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@AllArgsConstructor
public class BrandRestController {

    private BrandService brandService;


    @GetMapping("/{id}")
    public ResponseEntity<BrandEntity> getBrandById(@PathVariable Long id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @GetMapping
    public List<BrandEntity> getAllBrands() {
        return brandService.getAllBrands();
    }

    @PostMapping("/saveBrand")
    public ResponseEntity<String> saveBrand(@RequestBody BrandEntity brand) {

        brandService.saveBrand(brand);
        return ResponseEntity.ok().body("Brand with ID " + brand.getId() + " has been saved.");
    }

    @DeleteMapping("/deleteBrand/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable("id") Long id){
        brandService.deleteBrandById(id);
        return ResponseEntity.ok().body("Brand with ID " + id + " has been deleted.");
    }


    @PutMapping("/updateBrand/{id}")
    public ResponseEntity<String> updateBrand(@PathVariable("id") Long id, @RequestBody BrandEntity brand) {
        brandService.updateBrandById(id, brand);
        return ResponseEntity.ok().body("Brand with ID " + id + " has been updated.");
    }

}
