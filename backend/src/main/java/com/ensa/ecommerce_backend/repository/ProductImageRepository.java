package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity,UUID> {
    Optional<ProductImageEntity> findByName(String fileName);

}
