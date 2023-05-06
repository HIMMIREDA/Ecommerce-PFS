package com.ensa.ecommerce_backend.response;

import com.ensa.ecommerce_backend.DTO.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class getProductsResponse {

    private int totalPages;
    private int currentPage;
    private Long totalItems;

    private List<ProductDto> products;
}
