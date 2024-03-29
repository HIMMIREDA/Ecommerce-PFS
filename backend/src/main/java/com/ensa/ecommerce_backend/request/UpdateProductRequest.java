package com.ensa.ecommerce_backend.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateProductRequest {
    @Nullable
    @Size(min = 4, max = 100)
    private String name;

    @Nullable
    @Size(max = 1000)
    private String description;

    @Nullable
    @Digits(integer = 10, fraction = 0, message = "must be a valid integer")
    private Integer quantity;

    @Nullable
    @Digits(integer = 10, fraction = 2, message = "must be double value")
    private Double price;

    @Nullable
    @JsonProperty("brand")
    private String brandName = null;


    @Nullable
    @JsonProperty("category")
    private String categoryName = null;
}
