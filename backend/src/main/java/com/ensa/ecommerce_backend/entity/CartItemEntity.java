package com.ensa.ecommerce_backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@EqualsAndHashCode(exclude = {"cart"})
@Data
public class CartItemEntity implements Serializable {
    @Id
    @Column(updatable = false, nullable = false)
    private UUID id;
    private Integer quantity;

    @ManyToOne
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY)
    private CartEntity cart;


    @PrePersist
    protected void onCreate() {
        if (Objects.isNull(this.id)) {
            this.id = UUID.randomUUID();
        }
    }
}
