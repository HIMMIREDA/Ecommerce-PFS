package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    Optional<BrandEntity> findBrandEntityByName(String name);
}
