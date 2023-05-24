package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.response.CreatePaymentIntentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;

public interface StripeService {
    CreatePaymentIntentResponse createPaymentIntent() throws StripeException;

    boolean verifyWebhookEvent(String payload, String signatureHeader);

    Event parseWebhookEvent(String payload);
}
