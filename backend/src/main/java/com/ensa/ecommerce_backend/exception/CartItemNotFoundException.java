package com.ensa.ecommerce_backend.exception;

public class CartItemNotFoundException extends RuntimeException {
    public CartItemNotFoundException() {
    }

    public CartItemNotFoundException(String message) {
        super(message);
    }

    public CartItemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CartItemNotFoundException(Throwable cause) {
        super(cause);
    }

    public CartItemNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
