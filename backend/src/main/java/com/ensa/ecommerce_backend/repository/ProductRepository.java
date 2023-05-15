package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

    Optional<ProductEntity> findProductEntityByName(String name);

    Page<ProductEntity> findProductEntitiesByBrand(BrandEntity brand, Pageable pageable);

    Page<ProductEntity> findProductEntitiesByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.category.id = :categoryId or p.category.parentCategory.id = :categoryId or p.category.parentCategory.parentCategory.id = :categoryId")
    Page<ProductEntity> findProductEntitiesByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);
}
