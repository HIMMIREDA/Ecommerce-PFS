package com.ensa.ecommerce_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor @NoArgsConstructor @Data
public class ProductImageDTO {

    private Long productId;

    private UUID imageId;
}
