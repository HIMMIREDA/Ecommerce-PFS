package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.VariationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VariationRepository extends JpaRepository<VariationEntity, Long> {
    Optional<VariationEntity> findByName(String name);
}
