package com.ensa.ecommerce_backend.mapper;


import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.response.getCartResponse;

public class CartMapper {
    static public getCartResponse mapCartToResponse(CartEntity cart){
        return getCartResponse.builder()
                .total(cart.getTotal())
                .items(cart.getCartItems())
                .build();
    }
}
