package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.dto.AddressDto;
import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentRestController {

    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Object> createPaymentIntent(@RequestBody(required = false) AddressDto addressDto) {
        try {
            return ResponseEntity.ok(stripeService.createPaymentIntent(addressDto));
        } catch (StripeException exception) {
            return new ResponseEntity<>("Error while processing payment. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhookEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String signature) {
        try {
            boolean isPayloadValid = stripeService.handleWebHookEvent(payload, signature);
            return isPayloadValid ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (StripeException exception) {
            return ResponseEntity.internalServerError().body("Error occurred on server. try again later.");
        }

    }
}
