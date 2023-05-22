package com.ensa.ecommerce_backend.entityListener;


import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

public class ReviewEntityListener extends SpringBeanAutowiringSupport {

    @PrePersist
    @PreRemove
    @PreUpdate
    public void updateMeanRating(ReviewEntity review) {
        ProductEntity product = review.getProduct();
        double meanRating = product.getReviews().stream().mapToDouble(
                        (reviewEntity -> (double) reviewEntity.getRating().getValue())
                )
                .sum();
        meanRating += review.getRating().getValue();
        meanRating = meanRating / (product.getReviews().size() + 1);
        // Update the mean rating value
        product.setMeanRating((int) meanRating);
    }
}
