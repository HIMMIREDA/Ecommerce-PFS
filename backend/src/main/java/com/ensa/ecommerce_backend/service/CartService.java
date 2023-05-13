package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.CartDto;
import com.ensa.ecommerce_backend.entity.CartEntity;
import jakarta.servlet.http.HttpSession;

public interface CartService {
    CartDto getCartItems(HttpSession session);

    CartDto addItemToCart(Long productItemId, Integer quantity,HttpSession session);

    CartDto deleteCartItem(String CartItemId,HttpSession session);

    CartDto updateCartItem(String cartItemId, Integer quantity, HttpSession session);

    void mergeCarts(CartEntity sessionCart, CartEntity storedCart);
}
