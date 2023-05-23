package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.VariationOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariationOptionRepository extends JpaRepository<VariationOptionEntity, Long> {
}
