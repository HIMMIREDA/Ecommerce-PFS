package com.ensa.ecommerce_backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CreatePaymentIntentResponse {
    private String clientSecret;
}
