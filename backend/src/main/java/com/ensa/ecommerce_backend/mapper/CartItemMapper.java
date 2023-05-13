package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.CartItemDto;
import com.ensa.ecommerce_backend.entity.CartItemEntity;

public class CartItemMapper {
    public static CartItemDto toDto(CartItemEntity cartItemEntity){
        return CartItemDto.builder()
                .id(cartItemEntity.getId().toString())
                .quantity(cartItemEntity.getQuantity())
                .product(ProductMapper.toDto(cartItemEntity.getProduct()))
                .build();
    }
}
