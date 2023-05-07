package com.ensa.ecommerce_backend.request;


import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddProductRequest {

    @NotEmpty
    @Size(min = 4,max = 100)
    private String name;

    @NotEmpty
    @Size(max = 1000)
    private String description;

    @Digits(integer = 10, fraction = 0, message = "must be a valid integer")
    private Integer quantity;

    @Digits(integer = 10, fraction = 2, message = "must be double value")
    private Double price;

    private String brandName = null;


    @NotEmpty
    private String categoryName = null;

    @NotEmpty(message = "array cant be empty")
    @Size(min = 1,max = 5, message = "array can contain at most 5 images")
    private MultipartFile[] images;

}
