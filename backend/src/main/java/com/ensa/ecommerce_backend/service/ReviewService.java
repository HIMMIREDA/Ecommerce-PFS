package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.dto.ReviewDto;
import com.ensa.ecommerce_backend.request.AddReviewRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ReviewService {

    Page<ReviewDto> getProductReviews(Long productId, int numPage, int count);

    ReviewDto saveReview(AddReviewRequest reviewRequest);

    ReviewDto getReviewById(Long id);

    void deleteReviewById(Long id);

}
