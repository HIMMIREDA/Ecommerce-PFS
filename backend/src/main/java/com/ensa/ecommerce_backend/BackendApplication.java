package com.ensa.ecommerce_backend;

import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import com.ensa.ecommerce_backend.entity.RoleEntity;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import com.ensa.ecommerce_backend.repository.ProductImageRepository;
import com.ensa.ecommerce_backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Arrays;

@EnableAsync
@SpringBootApplication
public class BackendApplication implements CommandLineRunner {


    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        productImageRepository.save(new ProductImageEntity());
        RoleEntity user = RoleEntity.builder().name(RoleEnum.USER).build();
        RoleEntity admin = RoleEntity.builder().name(RoleEnum.ADMIN).build();
        RoleEntity seller = RoleEntity.builder().name(RoleEnum.SELLER).build();
        roleRepository.saveAll(Arrays.asList(user,admin,seller));
    }
}