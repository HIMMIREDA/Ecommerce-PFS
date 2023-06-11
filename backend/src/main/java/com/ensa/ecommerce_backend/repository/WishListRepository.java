package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.WishListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<WishListEntity,Long> {
}
