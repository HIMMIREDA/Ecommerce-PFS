package com.ensa.ecommerce_backend.exception;

public class ProductImageArraySizeException extends RuntimeException {
    public ProductImageArraySizeException() {
    }

    public ProductImageArraySizeException(String message) {
        super(message);
    }

    public ProductImageArraySizeException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductImageArraySizeException(Throwable cause) {
        super(cause);
    }

    public ProductImageArraySizeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
