package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.response.GetCartResponse;

public interface CartService {
    GetCartResponse getCartItems();

    void addItemToCart(Long productItemId, Integer quantity);

    void removeItemFromCart(Long CartItemId);

    void updateItemQuantity(Long id, Integer quantity);

}
