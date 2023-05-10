package com.ensa.ecommerce_backend.exception;

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
