package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.BrandDto;
import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.request.AddBrandRequest;
import com.ensa.ecommerce_backend.request.UpdateBrandRequest;
import org.springframework.data.domain.Page;

public interface BrandService {
    BrandDto saveBrand(AddBrandRequest addBrandRequest);

    void deleteBrandById(Long id);

    BrandDto updateBrandById(Long id, UpdateBrandRequest updateBrandRequest);

    BrandDto getBrandById(Long id);

    Page<BrandDto> getAllBrands(int numPage, int pageCount, String all);

    Page<ProductDto> getBrandProducts(Long brandId, int numPage, int pageCount);
}
