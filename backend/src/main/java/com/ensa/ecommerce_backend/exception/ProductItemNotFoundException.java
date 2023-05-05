package com.ensa.ecommerce_backend.exception;

public class ProductItemNotFoundException extends RuntimeException{
    public ProductItemNotFoundException() {
    }

    public ProductItemNotFoundException(String message) {
        super(message);
    }

    public ProductItemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductItemNotFoundException(Throwable cause) {
        super(cause);
    }

    public ProductItemNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
