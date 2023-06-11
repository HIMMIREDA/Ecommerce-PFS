package com.ensa.ecommerce_backend.dto;

import com.ensa.ecommerce_backend.entity.AddressEntity;
import com.ensa.ecommerce_backend.entity.OrderItemEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private String id;
    private double total;
    private LocalDateTime createdAt;

    private OrderStatus status;
    private AddressDto address;
    private List<OrderItemDto> orderItems = new ArrayList<>();
}
