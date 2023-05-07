package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.EmailVerificationTokenEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationTokenEntity,Long> {
    Optional<List<EmailVerificationTokenEntity>> findEmailVerificationTokenByUser(UserEntity user);
    Optional<EmailVerificationTokenEntity> findEmailVerificationTokenByToken(String token);
}
