package com.ensa.ecommerce_backend.search.product;

import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.search.SearchCriteria;
import com.ensa.ecommerce_backend.search.SearchOperation;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecificationBuilder {
    private final List<SearchCriteria> params;

    public ProductSpecificationBuilder() {
        this.params = new ArrayList<>();
    }

    public final ProductSpecificationBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public final ProductSpecificationBuilder with(SearchCriteria searchCriteria) {
        params.add(searchCriteria);
        return this;
    }

    public Specification<ProductEntity> build() {
        if (params.size() == 0) {
            return null;
        }

        Specification<ProductEntity> result = new ProductSpecification(params.get(0));
        for (int idx = 1; idx < params.size(); idx++) {
            SearchCriteria criteria = params.get(idx);
            result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
                    ? Specification.where(result).and(new ProductSpecification(criteria))
                    : Specification.where(result).or(new ProductSpecification(criteria));
        }

        return result;
    }
}
