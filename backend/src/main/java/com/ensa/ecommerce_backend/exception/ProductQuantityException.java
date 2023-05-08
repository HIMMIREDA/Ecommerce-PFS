package com.ensa.ecommerce_backend.exception;

public class ProductQuantityException extends RuntimeException {
    public ProductQuantityException() {
    }

    public ProductQuantityException(String message) {
        super(message);
    }

    public ProductQuantityException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductQuantityException(Throwable cause) {
        super(cause);
    }

    public ProductQuantityException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
