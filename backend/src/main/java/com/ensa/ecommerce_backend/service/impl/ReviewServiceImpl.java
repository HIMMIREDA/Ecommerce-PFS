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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;

    private ProductRepository productRepository;

    @Override
    public Page<ReviewDto> getProductReviews(Long productId, int numPage, int count) {
        Sort sortCriteria = Sort.by(Sort.Direction.ASC, "createdAt");
        Pageable paging = PageRequest.of(numPage, count, sortCriteria);
        return reviewRepository.findReviewEntitiesByProductId(productId, paging).map(ReviewMapper::toDto);
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
        reviewRepository.findById(id).ifPresent(
                reviewEntity -> {
                    reviewEntity.getReviewer().getReviews().removeIf(r -> r.getId().equals(reviewEntity.getId()));
                    reviewEntity.getProduct().getReviews().removeIf(r -> r.getId().equals(reviewEntity.getId()));
                    reviewRepository.delete(reviewEntity);
                }
        );
    }

}
