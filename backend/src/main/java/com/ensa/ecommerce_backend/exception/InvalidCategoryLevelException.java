package com.ensa.ecommerce_backend.exception;

public class InvalidCategoryLevelException extends RuntimeException {
    public InvalidCategoryLevelException() {
    }

    public InvalidCategoryLevelException(String message) {
        super(message);
    }

    public InvalidCategoryLevelException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidCategoryLevelException(Throwable cause) {
        super(cause);
    }

    public InvalidCategoryLevelException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
