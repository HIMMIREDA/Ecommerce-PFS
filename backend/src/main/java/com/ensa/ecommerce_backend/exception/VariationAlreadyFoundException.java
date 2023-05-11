package com.ensa.ecommerce_backend.exception;

public class VariationAlreadyFoundException extends RuntimeException {
    public VariationAlreadyFoundException() {
    }

    public VariationAlreadyFoundException(String message) {
        super(message);
    }

    public VariationAlreadyFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public VariationAlreadyFoundException(Throwable cause) {
        super(cause);
    }

    public VariationAlreadyFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
