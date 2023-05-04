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
public class CategoryEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private CategoryEntity parentCategory;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "parent_id")
    private List<CategoryEntity> subCategories = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products = new ArrayList<>();

    @ManyToMany(mappedBy = "categories")
    private List<BrandEntity> brands = new ArrayList<>();

}
