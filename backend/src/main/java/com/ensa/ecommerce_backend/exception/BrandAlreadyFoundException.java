package com.ensa.ecommerce_backend.exception;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class BrandAlreadyFoundException extends RuntimeException {
    public BrandAlreadyFoundException() {
    }

    public BrandAlreadyFoundException(String message) {
        super(message);
    }

    public BrandAlreadyFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BrandAlreadyFoundException(Throwable cause) {
        super(cause);
    }

    public BrandAlreadyFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
