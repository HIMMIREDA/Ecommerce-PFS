package com.ensa.ecommerce_backend.exception;

public class EmailVerifTokenExpiredException extends RuntimeException{
    public EmailVerifTokenExpiredException() {
    }

    public EmailVerifTokenExpiredException(String message) {
        super(message);
    }

    public EmailVerifTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmailVerifTokenExpiredException(Throwable cause) {
        super(cause);
    }

    public EmailVerifTokenExpiredException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
