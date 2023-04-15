package com.ensa.ecommerce_backend;

import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import com.ensa.ecommerce_backend.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {


    @Autowired
    private ProductImageRepository productImageRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        productImageRepository.save(new ProductImageEntity());
    }
}