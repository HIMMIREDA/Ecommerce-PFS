package com.ensa.ecommerce_backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CartItemDto {
    private String id;

    private Integer quantity;

    private ProductDto product;

}
