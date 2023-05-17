package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findCartEntityByUserEmail(String email);
}
