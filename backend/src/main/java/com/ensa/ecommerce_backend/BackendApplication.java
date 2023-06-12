package com.ensa.ecommerce_backend;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.RoleEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import com.ensa.ecommerce_backend.repository.RoleRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@EnableAsync
@SpringBootApplication
@EnableRedisHttpSession
@Transactional
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthService authService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            if (!roleRepository.existsByName(RoleEnum.USER)) {
                RoleEntity user = RoleEntity.builder().name(RoleEnum.USER).build();
                roleRepository.save(user);
            }
            if (!roleRepository.existsByName(RoleEnum.ADMIN)) {

                RoleEntity admin = RoleEntity.builder().name(RoleEnum.ADMIN).build();
                roleRepository.save(admin);
            }
            UserEntity adminUser = userRepository.findUserEntityByEmail("admin@gmail.com").orElse(null);
            if (adminUser == null) {

                adminUser = UserEntity.builder()
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("123456"))
                        .enabled(true)
                        .roles(Arrays.asList(roleRepository.findRoleByName(RoleEnum.USER), roleRepository.findRoleByName(RoleEnum.ADMIN)))
                        .firstName("admin")
                        .lastName("admin")
                        .phoneNumber("0612218950")
                        .username("admin123")
                        .build();
                CartEntity cart = CartEntity.builder().user(adminUser).build();
                adminUser.setCart(cart);
                userRepository.save(adminUser);
            }

        } catch (Exception exception) {
        }
    }
}