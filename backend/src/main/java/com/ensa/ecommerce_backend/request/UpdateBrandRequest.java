package com.ensa.ecommerce_backend.request;

import jakarta.validation.constraints.NotEmpty;
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
    @NotEmpty
    @Size(min = 4)
    private String name;

    private MultipartFile image = null;
}
