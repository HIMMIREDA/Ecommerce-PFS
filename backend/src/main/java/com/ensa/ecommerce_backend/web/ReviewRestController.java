package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.DTO.CategoryDto;
import com.ensa.ecommerce_backend.DTO.ProductDto;
import com.ensa.ecommerce_backend.DTO.ReviewDTO;
import com.ensa.ecommerce_backend.request.AddReviewRequest;
import com.ensa.ecommerce_backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
public class ReviewRestController {

    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> saveReview(@RequestBody @Valid AddReviewRequest addReviewRequest){
        ReviewDTO reviewDTO = reviewService.saveReview(addReviewRequest);
        return new ResponseEntity<>(reviewDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReview(@PathVariable("id") Long id) {
        reviewService.deleteReviewById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }


}
