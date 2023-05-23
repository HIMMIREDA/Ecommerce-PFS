package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentRestController {

    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Object> createPaymentIntent() {
        System.out.println("reached here");
        try {
            return ResponseEntity.ok(stripeService.createPaymentIntent());
        } catch (StripeException exception) {
            System.out.println("makhdamch hadaaa " + exception.getMessage());
            return new ResponseEntity<>("Error while processing payment. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
