package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.CartItemEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductQuantityException;
import com.ensa.ecommerce_backend.mapper.CartMapper;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.response.GetCartResponse;
import com.ensa.ecommerce_backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;
    private ProductRepository productRepository;

    @Override
    public GetCartResponse getCartItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return CartMapper.mapCartToResponse(cartRepository.findCartEntityByUser_Email(authentication.getName()).orElseThrow());
    }

    @Override
    public void addItemToCart(Long productItemId, Integer quantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUser_Email(authentication.getName()).orElseThrow();
        ProductEntity product = productRepository.findById(productItemId).orElseThrow(() ->
                new ProductNotFoundException("product with id : " + productItemId + " not found")
        );

        // check if requested quantity is available
        if (product.getQuantity() - quantity < 0) {
            throw new ProductQuantityException("quantity of product requested is not available.");
        }

        // update cart total
        cart.getCartItems().add(CartItemEntity.builder()
                .product(product)
                .cart(cart)
                .quantity(quantity)
                .build());
        cart.setTotal(cart.getTotal() + (product.getPrice() * quantity));
    }

    @Override
    public void removeItemFromCart(Long CartItemId) {

    }

    @Override
    public void updateItemQuantity(Long id, Integer quantity) {

    }
}
