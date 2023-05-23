package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class AddBrandRequest {

    @NotEmpty
    @Size(min = 4, message = "brand name must be at least 4 characters")
    private String name;

    @NotNull
    private MultipartFile image;
}
