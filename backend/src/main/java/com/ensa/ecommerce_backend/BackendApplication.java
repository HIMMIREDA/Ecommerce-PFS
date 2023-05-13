package com.ensa.ecommerce_backend;

import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.RoleEntity;
import com.ensa.ecommerce_backend.enums.RatingValue;
import com.ensa.ecommerce_backend.enums.RoleEnum;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.repository.RoleRepository;
import com.ensa.ecommerce_backend.request.AddReviewRequest;
import com.ensa.ecommerce_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

import java.util.Arrays;

@EnableAsync
@SpringBootApplication
@EnableRedisHttpSession
public class BackendApplication implements CommandLineRunner {


    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewService reviewService;




    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {

            RoleEntity user = RoleEntity.builder().name(RoleEnum.USER).build();
            RoleEntity admin = RoleEntity.builder().name(RoleEnum.ADMIN).build();
            RoleEntity seller = RoleEntity.builder().name(RoleEnum.SELLER).build();
            roleRepository.saveAll(Arrays.asList(user, admin, seller));
            ProductEntity productEntity = ProductEntity.builder().name("iphone").build();

            productRepository.save(productEntity);

            AddReviewRequest reviewRequest = AddReviewRequest.builder()
                    .comment("This is a good iphone")
                    .ratingValue(4)
                    .productName("iphone")
                    .build();

            reviewService.saveReview(reviewRequest);
        } catch (Exception exception) {
        }
    }
}