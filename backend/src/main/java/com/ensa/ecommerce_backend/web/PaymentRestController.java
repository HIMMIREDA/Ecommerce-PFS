package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
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
    public ResponseEntity<Object> createPaymentIntent() {
        try {
            return ResponseEntity.ok(stripeService.createPaymentIntent());
        } catch (StripeException exception) {
            return new ResponseEntity<>("Error while processing payment. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhookEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String signature) {
        if (!stripeService.verifyWebhookEvent(payload, signature)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Event event = stripeService.parseWebhookEvent(payload);
        if (event == null) {
            System.out.println("bad parsing");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        // Handle the event based on its type
        if ("payment_intent.succeeded".equals(event.getType())) {
            // Handle successful payment event
            System.out.println("successful payment");
        } else if ("payment_intent.payment_failed".equals(event.getType())) {
            // Handle payment failure event
            System.out.println("payment failed.");
        }

        return ResponseEntity.ok().build();
    }
}
