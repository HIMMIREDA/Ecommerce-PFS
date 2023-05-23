package com.ensa.ecommerce_backend.entityListener;


import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.util.Objects;

public class ReviewEntityListener extends SpringBeanAutowiringSupport {


    public void updateMeanRating(ReviewEntity review, String typeOfOperation) {
        ProductEntity product = review.getProduct();
        double meanRating = 0;
        meanRating = product.getReviews().stream().mapToDouble(
                        (reviewEntity -> (double) reviewEntity.getRating().getValue())
                )
                .sum();
        if (Objects.equals(typeOfOperation, "DELETE")) {
            if (product.getReviews().size() > 0) {
                meanRating = meanRating / product.getReviews().size();
            }
        }
        if (Objects.equals(typeOfOperation, "INSERT")) {
            meanRating += review.getRating().getValue();
            meanRating = meanRating / (product.getReviews().size() + 1);
        }
        // Update the mean rating value
        product.setMeanRating((int) meanRating);
    }

    @PrePersist
    public void onPersist(ReviewEntity review) {
        updateMeanRating(review, "INSERT");
    }

    @PreRemove
    public void onRemove(ReviewEntity review) {
        updateMeanRating(review, "DELETE");
    }
}
