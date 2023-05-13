package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.DTO.ReviewDTO;
import com.ensa.ecommerce_backend.request.AddReviewRequest;

public interface ReviewService {

    ReviewDTO saveReview(AddReviewRequest reviewRequest);

    ReviewDTO getReviewById(Long id);

    void deleteReviewById(Long id);

}
