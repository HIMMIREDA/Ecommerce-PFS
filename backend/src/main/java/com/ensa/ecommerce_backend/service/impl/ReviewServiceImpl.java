package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.ReviewDTO;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import com.ensa.ecommerce_backend.enums.RatingValue;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.ReviewNotFoundException;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.mapper.ReviewMapper;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.repository.ReviewRepository;
import com.ensa.ecommerce_backend.request.AddReviewRequest;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;

    private ProductRepository productRepository;

    private ProductService productService;
    @Override
    public ReviewDTO saveReview(AddReviewRequest reviewRequest) {

        ProductEntity product = productRepository.findProductEntityByName(reviewRequest.getProductName()).orElseThrow(()-> new ProductNotFoundException("Product Not Found"));


        ReviewEntity review = ReviewEntity.builder()
                .ratingValue(RatingValue.valueOf(reviewRequest.getRatingValue()))
                .comment(reviewRequest.getComment())
                .product(product)
                .build();

        return ReviewMapper.mapReviewEntitytoReviewDTO(reviewRepository.save(review));
    }

    @Override
    public ReviewDTO getReviewById(Long id) {
        return ReviewMapper.mapReviewEntitytoReviewDTO(
                reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException("Review with id : " + id + " not found")));
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

}
