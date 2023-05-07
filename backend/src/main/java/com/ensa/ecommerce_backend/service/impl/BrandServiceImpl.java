package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.BrandDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.exception.BrandAlreadyFoundException;
import com.ensa.ecommerce_backend.exception.BrandNotFoundException;
import com.ensa.ecommerce_backend.mapper.BrandMapper;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.BrandRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.request.AddBrandRequest;
import com.ensa.ecommerce_backend.request.UpdateBrandRequest;
import com.ensa.ecommerce_backend.service.BrandService;
import com.ensa.ecommerce_backend.service.ImageService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;
    private ImageService imageService;
    private ProductRepository productRepository;

    @Override
    public BrandDto saveBrand(AddBrandRequest addBrandRequest) {
        brandRepository.findBrandEntityByName(addBrandRequest.getName()).ifPresent(
                (brand) -> {
                    throw new BrandAlreadyFoundException("brand with name: " + addBrandRequest.getName() + " exists.");
                }
        );
        BrandEntity brand = BrandEntity.builder()
                .name(addBrandRequest.getName())
                .build();
        ImageEntity imageEntity = imageService.uploadImageToFileSystem(addBrandRequest.getImage());
        brand.setImage(imageEntity);
        return BrandMapper.mapBrandEntityToBrandDto(brandRepository.save(brand));
    }

    @Override
    public void deleteBrandById(Long id) {
        brandRepository.deleteById(id);
    }

    @Override
    public BrandDto updateBrandById(Long id, UpdateBrandRequest updateBrandRequest) {
        BrandEntity brand = brandRepository.findById(id).orElseThrow(
                () -> new BrandNotFoundException("brand with id: " + id + " not found")
        );
        brand.setName(updateBrandRequest.getName());
        if (updateBrandRequest.getImage() != null) {
            ImageEntity imageEntity = imageService.uploadImageToFileSystem(updateBrandRequest.getImage());
            imageEntity.setBrand(brand);
            brand.setImage(imageEntity);
        }
        return BrandMapper.mapBrandEntityToBrandDto(brandRepository.save(brand));
    }

    @Override
    public BrandDto getBrandById(Long id) {
        return BrandMapper.mapBrandEntityToBrandDto(
                brandRepository.findById(id).orElseThrow(() -> new BrandNotFoundException("Brand with id : " + id + " not found"))
        );
    }

    @Override
    public Page<BrandDto> getAllBrands(int numPage, int pageCount) {
        Pageable paging = PageRequest.of(numPage, pageCount);
        return brandRepository.findAll(paging).map(BrandMapper::mapBrandEntityToBrandDto);
    }

    @Override
    public Page<ProductDto> getBrandProducts(Long brandId, int numPage, int pageCount) {
        BrandEntity brand = brandRepository.findById(brandId).orElseThrow(
                () -> new BrandNotFoundException("Brand with id : " + brandId + " not found")
        );
        Pageable paging = PageRequest.of(numPage, pageCount);
        return productRepository.findProductEntitiesByBrand(brand, paging).map(ProductMapper::mapProductEntityToProductDto);
    }
}
