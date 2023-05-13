package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddItemToCartRequest {
    @Digits(integer = 10,fraction = 0)
    private Long productId;

    @Digits(integer = 10,fraction = 0)
    private Integer quantity;
}
