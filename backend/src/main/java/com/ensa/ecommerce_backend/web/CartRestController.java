package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.CartDto;
import com.ensa.ecommerce_backend.request.AddItemToCartRequest;
import com.ensa.ecommerce_backend.request.UpdateCartItemRequest;
import com.ensa.ecommerce_backend.service.CartService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartRestController {
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCartItems(HttpSession session) {
        return ResponseEntity.ok(cartService.getCartItems(session));
    }

    @PostMapping
    public ResponseEntity<CartDto> addItemToCart(@RequestBody @Valid AddItemToCartRequest addItemToCartRequest, HttpSession session) {
        return ResponseEntity.ok(cartService.addItemToCart(addItemToCartRequest.getProductId(), addItemToCartRequest.getQuantity(), session));
    }

    @DeleteMapping("/{cartItemId}")
    private ResponseEntity<CartDto> removeItemFromCart(@PathVariable String cartItemId, HttpSession session) {
        return ResponseEntity.ok(cartService.deleteCartItem(cartItemId, session));
    }

    @PutMapping("/{cartItemId}")
    private ResponseEntity<CartDto> updateCartItem(@PathVariable String cartItemId, @RequestBody @Valid UpdateCartItemRequest updateCartItemRequest, HttpSession session) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId, updateCartItemRequest.getQuantity(), session));
    }

}
