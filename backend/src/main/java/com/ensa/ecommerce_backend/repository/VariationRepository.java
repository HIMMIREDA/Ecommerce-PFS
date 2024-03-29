package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.VariationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariationRepository extends JpaRepository<VariationEntity, Long> {
}
