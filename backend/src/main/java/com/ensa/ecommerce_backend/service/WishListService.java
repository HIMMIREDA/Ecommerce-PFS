package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.ProductDto;

import java.util.List;

public interface WishListService {
    List<ProductDto> getAuthenticatedUserWishList();

    ProductDto addToWishList(Long id);

    void removeFromWishList(Long id);
}
