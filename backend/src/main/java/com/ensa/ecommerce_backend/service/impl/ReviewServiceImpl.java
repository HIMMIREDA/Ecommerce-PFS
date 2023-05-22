package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.dto.ReviewDto;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.enums.RatingValue;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.ReviewNotFoundException;
import com.ensa.ecommerce_backend.mapper.ReviewMapper;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.repository.ReviewRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.request.AddReviewRequest;
import com.ensa.ecommerce_backend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;

    private ProductRepository productRepository;

    @Override
    public List<ReviewDto> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId).stream().map(ReviewMapper::toDto).toList();
    }

    @Override
    public ReviewDto saveReview(AddReviewRequest reviewRequest) {

        ProductEntity product = productRepository.findById(reviewRequest.getProductId()).orElseThrow(() -> new ProductNotFoundException("Product Not Found"));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findUserEntityByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("user not found")
        );

        ReviewEntity review = ReviewEntity.builder()
                .rating(RatingValue.valueOf(reviewRequest.getRating()))
                .comment(reviewRequest.getComment())
                .product(product)
                .reviewer(user)
                .build();

        return ReviewMapper.toDto(reviewRepository.save(review));
    }

    @Override
    public ReviewDto getReviewById(Long id) {
        return ReviewMapper.toDto(
                reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException("Review with id : " + id + " not found")));
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

}
