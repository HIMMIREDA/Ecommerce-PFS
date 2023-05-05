package com.ensa.ecommerce_backend.exception;

public class ProductItemQuantityException extends RuntimeException{
    public ProductItemQuantityException() {
    }

    public ProductItemQuantityException(String message) {
        super(message);
    }

    public ProductItemQuantityException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductItemQuantityException(Throwable cause) {
        super(cause);
    }

    public ProductItemQuantityException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
