package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCartItemRequest {
    @Digits(integer = 10,fraction = 0)
    private Integer quantity;
}
