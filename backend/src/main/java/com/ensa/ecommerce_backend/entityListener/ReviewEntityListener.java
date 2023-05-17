package com.ensa.ecommerce_backend.entityListener;


import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
public class ReviewEntityListener {
    private ProductRepository productRepository;

    @PostPersist
    @PostRemove
    @PostUpdate
    public void updateMeanRating(ReviewEntity review) {
        ProductEntity product = review.getProduct();

        Double meanRating = productRepository.calculateMeanRating(product.getId());

        product.setMeanRating(meanRating.intValue());
        productRepository.save(product);
    }
}
