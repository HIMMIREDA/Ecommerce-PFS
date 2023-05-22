package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.ReviewDto;
import com.ensa.ecommerce_backend.request.AddReviewRequest;

import java.util.List;

public interface ReviewService {

    List<ReviewDto> getProductReviews(Long productId);
    ReviewDto saveReview(AddReviewRequest reviewRequest);

    ReviewDto getReviewById(Long id);

    void deleteReviewById(Long id);

}
