package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItemEntity, UUID> {
    Optional<CartItemEntity> findByCartAndId(CartEntity cart, UUID cartItemId);
    boolean existsCartItemEntityByCartAndId(CartEntity cart, UUID cartItemId);
}
