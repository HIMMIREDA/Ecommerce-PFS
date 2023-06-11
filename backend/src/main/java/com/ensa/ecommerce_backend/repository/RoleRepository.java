package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.RoleEntity;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    RoleEntity findRoleByName(RoleEnum name);
    boolean existsByName(RoleEnum name);
}
