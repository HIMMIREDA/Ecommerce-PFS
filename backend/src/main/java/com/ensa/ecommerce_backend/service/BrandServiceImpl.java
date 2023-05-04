package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.repository.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;

    @Override
    public void saveBrand(BrandEntity brand) {
        brandRepository.save(brand);
    }

    @Override
    public void deleteBrandById(Long id) {
        brandRepository.deleteById(id);
    }

    @Override
    public void updateBrandById(Long id, BrandEntity brand) {
        Optional<BrandEntity> existingBrand = brandRepository.findById(id);
        if (existingBrand.isPresent()) {
            BrandEntity updatedBrand = existingBrand.get();
            updatedBrand.setName(brand.getName());
            updatedBrand.setImage(brand.getImage());
            updatedBrand.setProducts(brand.getProducts());
            updatedBrand.setCategories(brand.getCategories());
            brandRepository.save(updatedBrand);
        } else {
            throw new IllegalArgumentException("Brand with ID " + id + " not found");
        }
    }

    @Override
    public BrandEntity getBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(()->new RuntimeException("Brand Not Found"));
    }

    @Override
    public List<BrandEntity> getAllBrands() {
        return brandRepository.findAll();
    }
}
