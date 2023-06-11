package com.ensa.ecommerce_backend.exception;

public class CartTotalMismatchException extends RuntimeException{
    public CartTotalMismatchException() {
    }

    public CartTotalMismatchException(String message) {
        super(message);
    }

    public CartTotalMismatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public CartTotalMismatchException(Throwable cause) {
        super(cause);
    }

    public CartTotalMismatchException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
