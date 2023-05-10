package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findRefreshTokensByToken(String token);

    void deleteRefreshTokenByToken(String token);
}

