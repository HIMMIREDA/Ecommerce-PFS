package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String description;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductImageEntity> productImages = new ArrayList<>();

}
