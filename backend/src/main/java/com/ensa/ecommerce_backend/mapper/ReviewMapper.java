package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.ReviewDto;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import org.springframework.beans.BeanUtils;

import java.util.HashMap;
import java.util.Map;

public class ReviewMapper {
    public static ReviewDto toDto(ReviewEntity reviewEntity){
        ReviewDto reviewDTO = new ReviewDto();
        BeanUtils.copyProperties(reviewEntity,reviewDTO);
        reviewDTO.setRating(reviewEntity.getRating().getValue());
        Map<String,String> user = new HashMap<>();
        user.put("id",reviewEntity.getReviewer().getId().toString());
        user.put("username",reviewEntity.getReviewer().getUsername());
        reviewDTO.setUser(user);
        return reviewDTO;
    }
}
