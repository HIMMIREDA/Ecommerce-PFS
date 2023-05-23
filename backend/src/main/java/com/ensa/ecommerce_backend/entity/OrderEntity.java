package com.ensa.ecommerce_backend.entity;

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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double total;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @Enumerated(value=EnumType.STRING)
    private OrderStatus status;
    @ManyToOne(cascade = CascadeType.ALL)
    private UserEntity user;
    @ManyToOne(cascade = CascadeType.ALL)
    private AddressEntity address;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<CartItemEntity> cartItems = new HashSet<>();
}
