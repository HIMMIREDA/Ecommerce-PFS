package com.ensa.ecommerce_backend.mapper;


import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.response.GetCartResponse;

public class CartMapper {
    static public GetCartResponse mapCartToResponse(CartEntity cart){
        return GetCartResponse.builder()
                .total(cart.getTotal())
                .items(cart.getCartItems())
                .build();
    }
}
