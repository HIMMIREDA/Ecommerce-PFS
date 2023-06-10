package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.service.WishListService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {

    private WishListService wishListService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAuthenticatedUserWishList(){
        return ResponseEntity.ok(wishListService.getAuthenticatedUserWishList());
    }

    @PostMapping("{id}")
    public ResponseEntity<ProductDto> addToWishList(@PathVariable Long id){
        return ResponseEntity.ok(wishListService.addToWishList(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> removeFromWishList(@PathVariable Long id){
        wishListService.removeFromWishList(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

}
