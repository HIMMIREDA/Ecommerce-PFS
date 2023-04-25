package com.ensa.ecommerce_backend.exception;

public class UserAlreadyFoundException extends RuntimeException{
    public UserAlreadyFoundException() {
    }

    public UserAlreadyFoundException(String message) {
        super(message);
    }

    public UserAlreadyFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAlreadyFoundException(Throwable cause) {
        super(cause);
    }

    public UserAlreadyFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
