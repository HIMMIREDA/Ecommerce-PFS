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
    @Size(min = 4)
    private String name;

    @Nullable
    @Size(max = 1000)
    private String description;
}
