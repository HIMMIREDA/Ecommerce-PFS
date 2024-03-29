package com.ensa.ecommerce_backend.entity;

import com.ensa.ecommerce_backend.converter.RatingValueConverter;
import com.ensa.ecommerce_backend.entityListener.ReviewEntityListener;
import com.ensa.ecommerce_backend.enums.RatingValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EntityListeners(ReviewEntityListener.class)
public class ReviewEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = RatingValueConverter.class)
    private RatingValue rating;

    private String comment;


    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
