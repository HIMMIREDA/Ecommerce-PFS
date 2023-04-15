package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductImageEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id",updatable = false,nullable = false)
    private UUID id;

    private String name;
    private String type;
    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;
}
