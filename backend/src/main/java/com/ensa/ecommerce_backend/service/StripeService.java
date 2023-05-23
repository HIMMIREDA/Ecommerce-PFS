package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.response.CreatePaymentIntentResponse;
import com.stripe.exception.StripeException;

public interface StripeService {
    CreatePaymentIntentResponse createPaymentIntent() throws StripeException;
}
