package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.*;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.exception.OrderNotFoundException;
import com.ensa.ecommerce_backend.repository.AddressRepository;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.repository.OrderRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    UserRepository userRepository;
    OrderRepository orderRepository;
    AddressRepository addressRepository;
    CartRepository cartRepository;

    @Override
    public OrderEntity addOrder(String orderId, AddOrderRequest addOrderRequest, String userEmail) {

        UserEntity user = userRepository.findUserEntityByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        CartEntity cart = user.getCart();

        OrderEntity order = OrderEntity.builder()
                .id(orderId)
                .user(user)
                .total(cart.getTotal())
                .status(OrderStatus.PENDING)
                .build();

        AddressEntity address = AddressEntity.builder()
                .addressLine(addOrderRequest.getAddress().getAddressLine())
                .country(addOrderRequest.getAddress().getCountry())
                .postalCode(addOrderRequest.getAddress().getPostalCode())
                .build();

        List<OrderItemEntity> orderItems = cart.getCartItems().stream().map(
                cartItem -> OrderItemEntity.builder()
                        .product(cartItem.getProduct())
                        .order(order)
                        .quantity(cartItem.getQuantity())
                        .build()
        ).toList();

        order.setOrderItems(orderItems);
        order.setAddress(address);
        user.getOrders().add(order);

        // clear cart
        cart.setCartItems(new HashSet<>());
        cartRepository.save(cart);
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrderById(String id) {
        orderRepository.deleteById(id);
    }

    @Override
    public OrderEntity getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Order Not Found"));
    }

    @Override
    public List<OrderEntity> getAuthenticatedUserOrders() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        return user.getOrders();

    }

    @Override
    public OrderEntity updateOrderStatus(String id, OrderStatus status) {
        OrderEntity order = orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Order Not Found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
