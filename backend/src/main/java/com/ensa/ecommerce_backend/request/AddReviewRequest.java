package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddReviewRequest {

    @Range(min = 1, max = 5, message = "Value must be between 1 and 5")
    private Integer ratingValue;

    @Size(min = 4, max = 100)
    private String comment;

    private String productName;
}
