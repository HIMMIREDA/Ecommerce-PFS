package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.OrderEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.request.AddOrderRequest;

import java.util.List;

public interface OrderService {
    OrderEntity addOrder(String orderId,AddOrderRequest addOrderRequest, String userEmail);
    void deleteOrderById(String id);

    OrderEntity getOrderById(String id);

    List<OrderEntity> getAuthenticatedUserOrders();

    OrderEntity updateOrderStatus(String id, OrderStatus status);
}
