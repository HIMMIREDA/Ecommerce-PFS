package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity,UUID> {
    Optional<ImageEntity> findByName(String fileName);

}
