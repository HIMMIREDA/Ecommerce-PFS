package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity,Long> {
    Optional<CartEntity> findCartEntityByUser_Email(String email);
}
