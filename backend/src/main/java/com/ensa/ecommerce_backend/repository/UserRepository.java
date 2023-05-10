package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByEmail(String email);

    Optional<UserEntity> findUserEntityByEmailOrUsername(String email, String username);

    Optional<UserEntity> findUserEntityByUsername(String username);

}

