package com.ensa.ecommerce_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Data
public class CartEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double total = (double) 0;

    @OneToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private Set<CartItemEntity> cartItems = new HashSet<>();

    public void setTotal(double total) {
        DecimalFormat df = new DecimalFormat("#0.00"); // format with 2 decimal places
        this.total = Double.parseDouble(df.format(total));
    }
}
