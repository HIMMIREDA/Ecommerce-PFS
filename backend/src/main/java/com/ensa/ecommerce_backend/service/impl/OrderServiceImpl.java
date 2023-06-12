package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.dto.OrderDto;
import com.ensa.ecommerce_backend.entity.*;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.exception.OrderNotFoundException;
import com.ensa.ecommerce_backend.mapper.OrderMapper;
import com.ensa.ecommerce_backend.repository.*;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    UserRepository userRepository;
    OrderRepository orderRepository;
    AddressRepository addressRepository;
    CartRepository cartRepository;
    ProductRepository productRepository;

    @Override
    public OrderDto addOrder(String orderId, AddOrderRequest addOrderRequest, String userEmail) {

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
                .city(addOrderRequest.getAddress().getCity())
                .user(user)
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

        return OrderMapper.toDto(orderRepository.save(order));
    }


    @Override
    public void deleteOrderById(String id) {
        orderRepository.deleteById(id);
    }

    @Override
    public OrderDto getOrderById(String id) {
        return OrderMapper.toDto(orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Order Not Found")));
    }

    @Override
    public List<OrderDto> getAuthenticatedUserOrders() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        return user.getOrders().stream().map(OrderMapper::toDto).toList();

    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream().map(OrderMapper::toDto).toList();
    }

    @Override
    public OrderDto updateOrderStatus(String id, OrderStatus status) {
        OrderEntity order = orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException("Order Not Found"));
        order.setStatus(status);
        return OrderMapper.toDto(orderRepository.save(order));
    }
}
