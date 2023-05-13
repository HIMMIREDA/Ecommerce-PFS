package com.ensa.ecommerce_backend.DTO;

import com.ensa.ecommerce_backend.enums.RatingValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReviewDTO {
    private RatingValue ratingValue;
    private String comment;
}
