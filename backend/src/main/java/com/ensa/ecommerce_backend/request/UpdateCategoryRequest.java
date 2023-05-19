package com.ensa.ecommerce_backend.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UpdateCategoryRequest {

    @Nullable
    @Size(min = 4, message = "must be more than 4 characters")
    private String name;

    @Nullable
    @Size(max = 1000, message = "cant be more than 1000 character ")
    private String description;
}
