package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.DTO.ReviewDto;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import org.springframework.beans.BeanUtils;

public class ReviewMapper {
    public static ReviewDto mapReviewEntitytoReviewDTO(ReviewEntity reviewEntity){
        ReviewDto reviewDTO = new ReviewDto();
        BeanUtils.copyProperties(reviewEntity,reviewDTO);
        return reviewDTO;
    }
}
