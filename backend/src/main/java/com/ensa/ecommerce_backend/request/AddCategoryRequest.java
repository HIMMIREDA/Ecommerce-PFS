package com.ensa.ecommerce_backend.request;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AddCategoryRequest {

    @NotEmpty
    @Size(min = 4, message = "category name must be at least 4 characters")
    private String name;

    @NotEmpty
    @Size(max = 1000)
    private String description;
}
