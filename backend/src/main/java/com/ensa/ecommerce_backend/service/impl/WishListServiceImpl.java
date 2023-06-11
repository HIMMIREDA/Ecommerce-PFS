package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.dto.ProductDto;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.entity.WishListEntity;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.mapper.ProductMapper;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.repository.WishListRepository;
import com.ensa.ecommerce_backend.service.WishListService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class WishListServiceImpl implements WishListService {

    private UserRepository userRepository;

    private ProductRepository productRepository;

    private WishListRepository wishListRepository;

    @Override
    public List<ProductDto> getAuthenticatedUserWishList() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findUserEntityByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("user not found")
        );
        return user.getWishList().getProducts().stream().map(ProductMapper::toDto).collect(Collectors.toList());

    }

    @Override
    public ProductDto addToWishList(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findUserEntityByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("user not found")
        );
        ProductEntity product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id "+id+" not found."));

        boolean productExists = user.getWishList().getProducts()
                .stream()
                .anyMatch(p -> p.getId().equals(product.getId()));

        if (!productExists) {
            user.getWishList().getProducts().add(product);
            wishListRepository.save(user.getWishList());
        }
        return ProductMapper.toDto(product);
    }

    @Override
    public void removeFromWishList(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findUserEntityByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("user not found")
        );

        WishListEntity wishList = user.getWishList();

        ProductEntity productToRemove = wishList.getProducts()
                .stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found in the wishlist."));

        wishList.getProducts().remove(productToRemove);

        wishListRepository.save(user.getWishList());
    }
}
