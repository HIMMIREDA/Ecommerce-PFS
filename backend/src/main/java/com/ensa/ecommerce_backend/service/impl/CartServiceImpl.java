package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.CartItemEntity;
import com.ensa.ecommerce_backend.entity.ProductItemEntity;
import com.ensa.ecommerce_backend.exception.ProductItemNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductItemQuantityException;
import com.ensa.ecommerce_backend.mapper.CartMapper;
import com.ensa.ecommerce_backend.response.getCartResponse;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.repository.ProductItemRepository;
import com.ensa.ecommerce_backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;


@Service
@AllArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;
    private ProductItemRepository productItemRepository;

    @Override
    public getCartResponse getCartItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return CartMapper.mapCartToResponse(cartRepository.findCartEntityByUser_Email(authentication.getName()).orElseThrow());
    }

    @Override
    public void addItemToCart(Long productItemId, Integer quantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUser_Email(authentication.getName()).orElseThrow();
        ProductItemEntity productItem = productItemRepository.findById(productItemId).orElseThrow(() ->
                new ProductItemNotFoundException("product with id : " + productItemId + " not found")
        );

        // check if requested quantity is available
        if (productItem.getQuantity() - quantity < 0) {
            throw new ProductItemQuantityException("quantity of product requested is not available.");
        }

        // update cart total
        cart.getCartItems().add(CartItemEntity.builder()
                .productItem(productItem)
                .cart(cart)
                .quantity(quantity)
                .build());
        cart.setTotal(cart.getTotal() + (productItem.getPrice() * quantity));
    }

    @Override
    public void removeItemFromCart(Long CartItemId) {

    }

    @Override
    public void updateItemQuantity(Long id, Integer quantity) {

    }
}
