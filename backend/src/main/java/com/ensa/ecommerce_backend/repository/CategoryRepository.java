package com.ensa.ecommerce_backend.repository;

import com.ensa.ecommerce_backend.entity.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findCategoryEntityByName(String name);

    @Query("SELECT c FROM CategoryEntity c WHERE c.parentCategory.parentCategory IS NOT NULL")
    Page<CategoryEntity> findGrandChildCategories(Pageable pageable);

    List<CategoryEntity> findCategoryEntityByParentCategoryNull();
}
