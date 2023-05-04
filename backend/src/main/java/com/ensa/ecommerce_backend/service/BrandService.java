package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.BrandEntity;

import java.util.List;

public interface BrandService {
    void saveBrand(BrandEntity brand);
    void deleteBrandById(Long id);
    void updateBrandById(Long id, BrandEntity brand);
    BrandEntity getBrandById(Long id);
    List<BrandEntity> getAllBrands();
}
