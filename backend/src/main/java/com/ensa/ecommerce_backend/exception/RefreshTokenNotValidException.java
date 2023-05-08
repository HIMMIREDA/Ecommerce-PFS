package com.ensa.ecommerce_backend.exception;

public class RefreshTokenNotValidException extends RuntimeException {
    public RefreshTokenNotValidException() {
    }

    public RefreshTokenNotValidException(String message) {
        super(message);
    }

    public RefreshTokenNotValidException(String message, Throwable cause) {
        super(message, cause);
    }

    public RefreshTokenNotValidException(Throwable cause) {
        super(cause);
    }

    public RefreshTokenNotValidException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
