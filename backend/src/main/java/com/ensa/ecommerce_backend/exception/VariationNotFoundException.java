package com.ensa.ecommerce_backend.exception;

public class VariationNotFoundException extends RuntimeException {
    public VariationNotFoundException() {
    }

    public VariationNotFoundException(String message) {
        super(message);
    }

    public VariationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public VariationNotFoundException(Throwable cause) {
        super(cause);
    }

    public VariationNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
