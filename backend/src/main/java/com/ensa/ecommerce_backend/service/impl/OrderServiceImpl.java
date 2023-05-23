package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.AddressEntity;
import com.ensa.ecommerce_backend.entity.OrderEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.exception.OrderNotFoundException;
import com.ensa.ecommerce_backend.mapper.AddressMapper;
import com.ensa.ecommerce_backend.repository.AddressRepository;
import com.ensa.ecommerce_backend.repository.OrderRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    UserRepository userRepository;
    OrderRepository orderRepository;
    AddressRepository addressRepository;

    @Override
    public OrderEntity addOrder(AddOrderRequest addOrderRequest) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(userEmail).orElseThrow(()-> new UsernameNotFoundException("User Not Found"));

        AddressEntity address = AddressEntity.builder()
                .addressLine(addOrderRequest.getAddress().getAddressLine())
                .country(addOrderRequest.getAddress().getCountry())
                .postalCode(addOrderRequest.getAddress().getPostalCode())
                .build();
        OrderEntity order = OrderEntity.builder()
                .user(user)
                .cartItems(user.getCart().getCartItems())
                .address(address)
                .total(user.getCart().getTotal())
                .status(OrderStatus.PENDING)
                .build();

        user.getOrders().add(order);

        addressRepository.save(address);

        return orderRepository.save(order);
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public OrderEntity getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException("Order Not Found"));
    }

    @Override
    public List<OrderEntity> getAuthenticatedUserOrders() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user = userRepository.findUserEntityByEmail(userEmail).orElseThrow(()-> new UsernameNotFoundException("User Not Found"));

        return user.getOrders();

    }

    @Override
    public OrderEntity updateOrderStatus(Long id, OrderStatus status) {
        OrderEntity order = orderRepository.findById(id).orElseThrow(()->new OrderNotFoundException("Order Not Found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
