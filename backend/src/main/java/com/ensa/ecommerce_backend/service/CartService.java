package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.CartItemEntity;
import com.ensa.ecommerce_backend.response.getCartResponse;

import java.util.List;

public interface CartService {
     getCartResponse getCartItems();

    void addItemToCart(Long productItemId,Integer quantity);
    void removeItemFromCart(Long CartItemId);
    void updateItemQuantity(Long id,Integer quantity);

}
