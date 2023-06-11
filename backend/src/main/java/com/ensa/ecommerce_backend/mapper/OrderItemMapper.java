package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.OrderItemDto;
import com.ensa.ecommerce_backend.entity.OrderItemEntity;

public class OrderItemMapper {
    public static OrderItemDto toDto(OrderItemEntity orderItemEntity){

        return OrderItemDto.builder()
                .id(orderItemEntity.getId())
                .product(ProductMapper.toDto(orderItemEntity.getProduct()))
                .quantity(orderItemEntity.getQuantity())
                .build();
    }
}
