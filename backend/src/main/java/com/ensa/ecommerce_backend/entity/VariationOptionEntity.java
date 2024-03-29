package com.ensa.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class VariationOptionEntity {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String value;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private VariationEntity variation;
}
