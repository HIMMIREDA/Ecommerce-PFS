package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity,String> {
}
