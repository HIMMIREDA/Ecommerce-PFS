package com.ensa.ecommerce_backend.request;

import com.ensa.ecommerce_backend.enums.OrderStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UpdateOrderRequest {
    private OrderStatus status;
}
