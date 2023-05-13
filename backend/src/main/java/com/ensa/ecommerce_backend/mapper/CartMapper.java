package com.ensa.ecommerce_backend.mapper;


import com.ensa.ecommerce_backend.DTO.CartDto;
import com.ensa.ecommerce_backend.entity.CartEntity;

import java.util.stream.Collectors;

public class CartMapper {
    static public CartDto toDto(CartEntity cart) {
        return CartDto.builder()
                .total(cart.getTotal())
                .items(cart.getCartItems().stream().map(CartItemMapper::toDto).collect(Collectors.toList()))
                .build();
    }
}
