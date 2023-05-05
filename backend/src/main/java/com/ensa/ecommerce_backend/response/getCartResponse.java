package com.ensa.ecommerce_backend.response;

import com.ensa.ecommerce_backend.entity.CartItemEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class getCartResponse {
    private double total;

    private List<CartItemEntity> items;
}
