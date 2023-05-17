package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(exclude = {"products"})
public class BrandEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "brand",fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<ProductEntity> products = new ArrayList<>();

    @OneToOne
    private ImageEntity image;


}
