package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.response.GetCartResponse;
import com.ensa.ecommerce_backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartRestController {
    private CartService cartService;

    @GetMapping
    public ResponseEntity<GetCartResponse> getCartItems() {
        return ResponseEntity.ok(cartService.getCartItems());
    }
}
