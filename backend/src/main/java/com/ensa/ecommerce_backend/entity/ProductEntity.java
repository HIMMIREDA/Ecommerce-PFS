package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Integer quantity;
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    private BrandEntity brand;

    @ManyToOne(fetch = FetchType.LAZY)
    private CategoryEntity category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ImageEntity> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CartItemEntity> cartItems = new ArrayList<>();

    @ManyToMany(mappedBy = "products")
    private List<VariationEntity> variations = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewEntity> reviews = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "mean_rating")
    private Integer meanRating = 0;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @ManyToMany
    private List<OrderEntity> orders = new ArrayList<>();

    @PrePersist
    public void initializeMeanRating() {
        this.meanRating = 0;
    }
}
