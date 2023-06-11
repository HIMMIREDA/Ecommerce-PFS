package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.OrderDto;
import com.ensa.ecommerce_backend.entity.OrderEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.request.AddOrderRequest;

import java.util.List;

public interface OrderService {
    OrderDto addOrder(String orderId, AddOrderRequest addOrderRequest, String userEmail);
    void deleteOrderById(String id);

    OrderDto getOrderById(String id);

    List<OrderDto> getAuthenticatedUserOrders();

    OrderDto updateOrderStatus(String id, OrderStatus status);
}
