package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Page<ProductEntity> findProductEntitiesByBrand(BrandEntity brand, Pageable pageable);
}
