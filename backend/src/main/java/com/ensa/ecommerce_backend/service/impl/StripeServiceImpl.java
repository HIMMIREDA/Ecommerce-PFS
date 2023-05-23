package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.exception.CartTotalMismatchException;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.response.CreatePaymentIntentResponse;
import com.ensa.ecommerce_backend.service.CartService;
import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StripeServiceImpl implements StripeService {
    private final CartService cartService;
    private final CartRepository cartRepository;
    @Value("${stripe.secret_key}")
    private String STRIPE_SECRET_KEY;
    @Value("${stripe.webhook_secret_key}")
    private String STRIPE_WEBHOOK_SECRET;

    @Autowired
    public StripeServiceImpl(CartService cartService, CartRepository cartRepository) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = STRIPE_SECRET_KEY;
    }

    @Override
    public CreatePaymentIntentResponse createPaymentIntent() throws StripeException {
        // @TODO: move this to order service
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUserEmail(authentication.getName()).orElseThrow();
        if (cartService.getCartTotal() != cart.getTotal() || cart.getTotal() == 0) {
            throw new CartTotalMismatchException("There is a discrepancy in the cart total. Please review your order and try again.");
        }
        // @END:TODO

        // @TODO: dont forget to lock product when payment is successful and reduce quantity of product
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) cart.getTotal())
                .setCurrency("usd")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                )
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return CreatePaymentIntentResponse.builder()
                .clientSecret(paymentIntent.getClientSecret())
                .build();
    }
}
