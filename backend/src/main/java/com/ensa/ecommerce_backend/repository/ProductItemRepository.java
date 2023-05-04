package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.ProductItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductItemRepository extends JpaRepository<ProductItemEntity,Long> {

}
