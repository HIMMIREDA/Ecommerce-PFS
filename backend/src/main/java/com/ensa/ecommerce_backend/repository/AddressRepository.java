package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<AddressEntity,Long> {
}
