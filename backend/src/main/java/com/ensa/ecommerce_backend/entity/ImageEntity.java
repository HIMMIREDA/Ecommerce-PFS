package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(exclude = {"product","brand"})
public class ImageEntity implements Serializable {
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String extension;
    private String imagePath;

    //////////////////////////////////
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;

    //////////////////////////////////
    @OneToOne(mappedBy = "image",fetch = FetchType.LAZY)
    private BrandEntity brand;


}
