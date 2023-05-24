package com.ensa.ecommerce_backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AddressEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String addressLine;

    private Long postalCode;

    private String country;
    private String city;

    @ManyToOne @JsonIgnore
    private UserEntity user;
    @OneToMany(mappedBy = "address") @JsonIgnore
    private List<OrderEntity> orders = new ArrayList<>();

}
