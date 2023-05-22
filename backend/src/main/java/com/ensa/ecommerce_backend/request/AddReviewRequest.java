package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.NotEmpty;
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
    private Integer rating;

    @NotEmpty
    @Size(min = 4, max = 100, message = "must be between 4 and 100 character")
    private String comment;

    private Long productId;
}
