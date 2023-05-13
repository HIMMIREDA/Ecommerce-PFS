package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.ReviewDTO;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import org.springframework.beans.BeanUtils;

public class ReviewMapper {
    public static ReviewDTO mapReviewEntitytoReviewDTO(ReviewEntity reviewEntity){
        ReviewDTO reviewDTO = new ReviewDTO();
        BeanUtils.copyProperties(reviewEntity,reviewDTO);
        return reviewDTO;
    }
}
