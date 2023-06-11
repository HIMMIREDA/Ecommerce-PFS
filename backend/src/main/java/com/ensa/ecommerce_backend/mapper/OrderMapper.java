package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.OrderDto;
import com.ensa.ecommerce_backend.entity.OrderEntity;

public class OrderMapper {
    public static OrderDto toDto(OrderEntity orderEntity){
        return OrderDto.builder()
                .id(orderEntity.getId())
                .address(AddressMapper.toDto(orderEntity.getAddress()))
                .createdAt(orderEntity.getCreatedAt())
                .status(orderEntity.getStatus())
                .total(orderEntity.getTotal())
                .orderItems(orderEntity.getOrderItems().stream().map(OrderItemMapper::toDto).toList())
                .build();
    }
}
