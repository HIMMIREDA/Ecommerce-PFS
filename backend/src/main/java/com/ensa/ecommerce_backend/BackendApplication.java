package com.ensa.ecommerce_backend;

import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Arrays;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        final UserEntity user1 = new UserEntity(Long.valueOf(1),"reda");
        final UserEntity user2 = new UserEntity(Long.valueOf(2),"hamza");
        final UserEntity user3 = new UserEntity(Long.valueOf(3),"oussama");

        userRepository.saveAll(Arrays.asList(user1,user2,user3));
    }
}
