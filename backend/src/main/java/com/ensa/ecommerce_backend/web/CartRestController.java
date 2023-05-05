package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.ensa.ecommerce_backend.response.getCartResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartRestController {
    private CartService cartService;

    @GetMapping
    public ResponseEntity<getCartResponse> getCartItems(){
        return ResponseEntity.ok(cartService.getCartItems());
    }
}
