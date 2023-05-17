package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.CartDto;
import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.entity.CartItemEntity;
import com.ensa.ecommerce_backend.entity.ProductEntity;
import com.ensa.ecommerce_backend.exception.CartItemNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductQuantityException;
import com.ensa.ecommerce_backend.mapper.CartMapper;
import com.ensa.ecommerce_backend.repository.CartItemRepository;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.repository.ProductRepository;
import com.ensa.ecommerce_backend.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private ProductRepository productRepository;

    @Override
    public CartDto getCartItems(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(SecurityContextHolder.getContext().getAuthentication()
                instanceof AnonymousAuthenticationToken)) {
            return getCartItemsAuth(authentication.getName());
        }
        return getCartItemsUnAuth(session);
    }


    private CartDto getCartItemsAuth(String userEmail) {
        CartEntity cart = cartRepository.findCartEntityByUserEmail(userEmail).orElseThrow();
        cart.setTotal(
                cart.getCartItems().stream().mapToDouble(
                        item -> item.getQuantity() * item.getProduct().getPrice()
                ).sum()
        );

        return CartMapper.toDto(cartRepository.save(cart));
    }

    private CartDto getCartItemsUnAuth(HttpSession session) {
        if (session.getAttribute("cart") == null) {
            CartEntity cart = CartEntity.builder()
                    .cartItems(new HashSet<>())
                    .total(0.0)
                    .build();
            session.setAttribute("cart", cart);
            return CartMapper.toDto(cart);
        }
        final CartEntity cart = (CartEntity) session.getAttribute("cart");
        updateUnAuthCartProducts(cart);
        cart.setTotal(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice()).sum());
        session.setAttribute("cart",cart);
        return CartMapper.toDto(cart);
    }

    // merge redis session cart with mysql stored cart
    public void mergeCarts(CartEntity sessionCart, CartEntity storedCart) {
        Set<CartItemEntity> sessionCartItems = sessionCart.getCartItems();
        Set<CartItemEntity> storedCartItems = storedCart.getCartItems();
        for (CartItemEntity newCartItem : sessionCartItems) {
            mergeItemWithCart(storedCartItems, newCartItem);
        }
        storedCart.setCartItems(storedCartItems);
        cartRepository.save(storedCart);
    }

    private void mergeItemWithCart(Set<CartItemEntity> cartItems, CartItemEntity newCartItem) {
        for (CartItemEntity cartItemEntity : cartItems) {
            if (cartItemEntity.getProduct().getId().equals(newCartItem.getProduct().getId())) {
                cartItemEntity.setQuantity(newCartItem.getQuantity());
                cartItemEntity.setProduct(newCartItem.getProduct());
                return;
            }
        }
        cartItems.add(newCartItem);
    }

    // update products of unauthenticated cart items
    private void updateUnAuthCartProducts(CartEntity cart) {
        cart.getCartItems().forEach(cartItem -> {
            ProductEntity product = productRepository.findById(cartItem.getProduct().getId()).orElse(null);
            cartItem.setProduct(product);
        });
        Set<CartItemEntity> updatedCartItems = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getProduct() != null)
                .collect(Collectors.toSet());
        cart.setCartItems(updatedCartItems);
    }

    @Override
    public CartDto addItemToCart(Long productId, Integer quantity, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartDto cartDto = null;
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return addItemToCartAuth(productId, quantity);
        }
        return addItemToCartUnAuth(productId, quantity, session);
    }

    private CartDto addItemToCartAuth(Long productId, Integer quantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUserEmail(authentication.getName()).orElseThrow();
        ProductEntity product = productRepository.findById(productId).orElseThrow(() ->
                new ProductNotFoundException("product with id : " + productId + " not found")
        );

        // check if requested quantity is available
        if (product.getQuantity() - quantity < 0) {
            throw new ProductQuantityException("quantity of product requested is not available.");
        }

        mergeItemWithCart(
                cart.getCartItems(),
                CartItemEntity.builder()
                        .id(UUID.randomUUID())
                        .cart(cart)
                        .quantity(quantity)
                        .product(product)
                        .build()
        );
        cart.setTotal(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice()).sum());

        return CartMapper.toDto(cartRepository.save(cart));
    }

    private CartDto addItemToCartUnAuth(Long productId, Integer quantity, HttpSession session) {
        CartEntity cart = (CartEntity) session.getAttribute("cart");
        ProductEntity product = productRepository.findById(productId).orElseThrow(() ->
                new ProductNotFoundException("product with id : " + productId + " not found")
        );

        // check if requested quantity is available or its null
        if (product.getQuantity() - quantity < 0 || quantity.equals(0)) {
            throw new ProductQuantityException("quantity of product requested is not available or quantity is null.");
        }
        if (cart == null) {
            cart = new CartEntity();
            cart.setCartItems(new HashSet<>());
        }
        mergeItemWithCart(
                cart.getCartItems(),
                CartItemEntity.builder()
                        .id(UUID.randomUUID())
                        .cart(cart)
                        .quantity(quantity)
                        .product(product)
                        .build()
        );
        cart.setTotal(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice()).sum());
        session.setAttribute("cart", cart);

        return CartMapper.toDto(cart);
    }

    @Override
    public CartDto deleteCartItem(String cartItemId, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartDto cartDto = null;
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            cartDto = deleteCartItemAuth(cartItemId);
        } else {
            cartDto = deleteCartItemUnAuth(cartItemId, session);
        }

        return cartDto;
    }

    private CartDto deleteCartItemAuth(String cartItemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUserEmail(authentication.getName()).orElseThrow();
        boolean isCartItemExist = cartItemRepository.existsCartItemEntityByCartAndId(cart, UUID.fromString(cartItemId));
        if (!isCartItemExist) return CartMapper.toDto(cart);

        cart.setCartItems(cart.getCartItems().stream().filter(item -> !item.getId().toString().equals(cartItemId)).collect(Collectors.toSet()));
        cartItemRepository.deleteById(UUID.fromString(cartItemId));
        cart.setTotal(
                cart.getCartItems().stream().mapToDouble(
                        item -> item.getQuantity() * item.getProduct().getPrice()
                ).sum()
        );
        return CartMapper.toDto(cart);
    }

    private CartDto deleteCartItemUnAuth(String cartItemId, HttpSession session) {
        CartEntity cart = (CartEntity) session.getAttribute("cart");

        if (cart == null) {
            cart = new CartEntity();
            cart.setCartItems(new HashSet<>());
            session.setAttribute("cart", cart);
        }
        cart.setCartItems(
                cart.getCartItems().stream().filter(
                        cartItem -> !cartItem.getId().toString().equals(cartItemId)
                ).collect(Collectors.toSet())
        );
        cart.setTotal(
                cart.getCartItems().stream().mapToDouble(
                        cartItem -> cartItem.getQuantity() * cartItem.getProduct().getPrice()
                ).sum()
        );
        session.setAttribute("cart", cart);
        return CartMapper.toDto(cart);
    }


    @Override
    public CartDto updateCartItem(String cartItemId, Integer quantity, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartDto cartDto = null;
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            cartDto = updateCartItemAuth(cartItemId, quantity);
        } else {
            cartDto = updateCartItemUnAuth(cartItemId, quantity, session);
        }

        return cartDto;
    }


    private CartDto updateCartItemAuth(String cartItemId, Integer quantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUserEmail(authentication.getName()).orElseThrow();

        CartItemEntity cartItem = cartItemRepository.findByCartAndId(cart, UUID.fromString(cartItemId))
                .orElseThrow(
                        () -> new CartItemNotFoundException("cart item with id : " + cartItemId + " not found ")
                );


        // check if requested quantity is available
        if (cartItem.getProduct().getQuantity() - quantity < 0) {
            throw new ProductQuantityException("quantity of product requested is not available.");
        }

        cartItem.setQuantity(quantity);

        cart.setTotal(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice()).sum());

        return CartMapper.toDto(cartRepository.save(cart));
    }

    private CartDto updateCartItemUnAuth(String cartItemId, Integer quantity, HttpSession session) {
        CartEntity cart = (CartEntity) session.getAttribute("cart");

        if (cart == null) {
            cart = new CartEntity();
            cart.setCartItems(new HashSet<>());
            session.setAttribute("cart", cart);
        }

        CartItemEntity newCartItem = cart.getCartItems().stream().filter(
                        cartItem -> cartItem.getId().toString().equals(cartItemId)
                )
                .findAny()
                .orElseThrow(
                        () -> new CartItemNotFoundException("Cart item with id: " + cartItemId + " not found")
                ).toBuilder()
                .quantity(quantity)
                .build();

        ProductEntity product = productRepository.findById(newCartItem.getProduct().getId()).orElseThrow(() ->
                new ProductNotFoundException("product with id : " + newCartItem.getProduct().getId() + " not found")
        );

        // check if requested quantity is available or its null
        if (product.getQuantity() - quantity < 0 || quantity.equals(0)) {
            throw new ProductQuantityException("quantity of product requested is not available or quantity is null.");
        }
        newCartItem.setProduct(product);
        mergeItemWithCart(cart.getCartItems(), newCartItem);

        cart.setTotal(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice()).sum());
        session.setAttribute("cart", cart);
        return CartMapper.toDto(cart);
    }
}
