package com.ensa.ecommerce_backend.dto;

import com.ensa.ecommerce_backend.enums.RatingValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReviewDto {
    private Long id;
    private Integer rating;
    private String comment;

    private Map<String,String> user;
}
