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
public class ImageEntity {
    @Id
    @Column(name = "id",updatable = false,nullable = false)
    private UUID id;

    private String extension;
    private String imagePath;

    //////////////////////////////////
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;

    //////////////////////////////////
    @OneToOne(mappedBy = "image")
    private BrandEntity brand;


}
