package com.ensa.ecommerce_backend.DTO;

import com.ensa.ecommerce_backend.entity.CartItemEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CartDto {
    private double total;
    private List<CartItemDto> items;
}
