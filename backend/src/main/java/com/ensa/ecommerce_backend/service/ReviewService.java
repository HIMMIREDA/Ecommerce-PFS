package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ReviewDto;
import com.ensa.ecommerce_backend.request.AddReviewRequest;

public interface ReviewService {

    ReviewDto saveReview(AddReviewRequest reviewRequest);

    ReviewDto getReviewById(Long id);

    void deleteReviewById(Long id);

}
