package com.ensa.ecommerce_backend.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateBrandRequest {
    @Nullable
    @Size(min = 4, message = "must be more than 4 characters")
    private String name;

    private MultipartFile image = null;
}
