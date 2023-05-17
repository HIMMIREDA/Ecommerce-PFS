package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.request.RegistrationRequest;

public class UserMapper {

    static public UserEntity toEntity(RegistrationRequest request) {
        return UserEntity.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }
}
