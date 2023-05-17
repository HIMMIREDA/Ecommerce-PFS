package com.ensa.ecommerce_backend.search.product;

import com.ensa.ecommerce_backend.entity.BrandEntity;
import com.ensa.ecommerce_backend.entity.CategoryEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.ReviewEntity;
import com.ensa.ecommerce_backend.search.SearchCriteria;
import com.ensa.ecommerce_backend.search.SearchOperation;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.Objects;

public class ProductSpecification implements Specification<ProductEntity> {

    private final SearchCriteria searchCriteria;

    public ProductSpecification(final SearchCriteria searchCriteria) {
        super();
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<ProductEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        String strToSearch = searchCriteria.getValue().toString().toLowerCase();

        switch (Objects.requireNonNull(SearchOperation.getSimpleOperation(searchCriteria.getOperation()))) {
            case CONTAINS -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.like(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), "%" + strToSearch + "%");
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.like(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), "%" + strToSearch + "%");
                }
                return cb.like(cb.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");
            }
            case DOES_NOT_CONTAIN -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.notLike(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), "%" + strToSearch + "%");
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.notLike(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), "%" + strToSearch + "%");
                }
                return cb.notLike(cb.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch + "%");
            }
            case BEGINS_WITH -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.like(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), strToSearch + "%");
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.like(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), strToSearch + "%");
                }
                return cb.like(cb.lower(root.get(searchCriteria.getFilterKey())), strToSearch + "%");
            }
            case DOES_NOT_BEGIN_WITH -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.notLike(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), strToSearch + "%");
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.notLike(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), strToSearch + "%");
                }
                return cb.notLike(cb.lower(root.get(searchCriteria.getFilterKey())), strToSearch + "%");
            }
            case ENDS_WITH -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.like(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), "%" + strToSearch);
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.like(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), "%" + strToSearch);
                }
                return cb.like(cb.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch);
            }
            case DOES_NOT_END_WITH -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.notLike(cb.lower(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase())), "%" + strToSearch);
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.notLike(cb.lower(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase())), "%" + strToSearch);
                }
                return cb.notLike(cb.lower(root.get(searchCriteria.getFilterKey())), "%" + strToSearch);
            }
            case EQUAL -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.equal(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase()), searchCriteria.getValue());
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.equal(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase()), searchCriteria.getValue());
                }
                return cb.equal(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());
            }
            case NOT_EQUAL -> {
                if (searchCriteria.getFilterKey().equals("categoryName")) {
                    return cb.notEqual(categoryEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("category", "").toLowerCase()), searchCriteria.getValue());
                }
                if (searchCriteria.getFilterKey().equals("brandName")) {
                    return cb.notEqual(brandEntityJoin(root).<String>get(searchCriteria.getFilterKey().replace("brand", "").toLowerCase()), searchCriteria.getValue());
                }
                return cb.notEqual(root.get(searchCriteria.getFilterKey()), searchCriteria.getValue());
            }
            case NUL -> {
                return cb.isNull(root.get(searchCriteria.getFilterKey()));
            }
            case NOT_NULL -> {
                return cb.isNotNull(root.get(searchCriteria.getFilterKey()));
            }
            case GREATER_THAN -> {
                return cb.greaterThan(root.<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());
            }
            case GREATER_THAN_EQUAL -> {
                return cb.greaterThanOrEqualTo(root.<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());
            }
            case LESS_THAN -> {
                return cb.lessThan(root.<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());
            }
            case LESS_THAN_EQUAL -> {
                return cb.lessThanOrEqualTo(root.<String>get(searchCriteria.getFilterKey()), searchCriteria.getValue().toString());
            }
        }
        return null;
    }

    private Join<ProductEntity, CategoryEntity> categoryEntityJoin(Root<ProductEntity> root) {
        return root.join("category");
    }

    private Join<ProductEntity, BrandEntity> brandEntityJoin(Root<ProductEntity> root) {
        return root.join("brand");
    }
}