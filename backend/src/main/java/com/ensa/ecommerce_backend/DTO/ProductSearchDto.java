package com.ensa.ecommerce_backend.DTO;


import com.ensa.ecommerce_backend.search.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductSearchDto {
    private List<SearchCriteria> searchCriteriaList;
    private String dataOption;
}
