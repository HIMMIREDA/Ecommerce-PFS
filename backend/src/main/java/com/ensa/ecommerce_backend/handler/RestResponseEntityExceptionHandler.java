package com.ensa.ecommerce_backend.handler;

import com.ensa.ecommerce_backend.exception.EmailVerifTokenExpiredException;
import com.ensa.ecommerce_backend.exception.RefreshTokenNotValidException;
import com.ensa.ecommerce_backend.exception.UserAlreadyFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    record JsonExceptionResponse(String message, Integer errorCode) {
    }

    @ExceptionHandler(value = {UserAlreadyFoundException.class})
    public ResponseEntity<JsonExceptionResponse> handleUserAlreadyFoundException(UserAlreadyFoundException ex) {
        return new ResponseEntity<>(new JsonExceptionResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = {RefreshTokenNotValidException.class, EmailVerifTokenExpiredException.class})
    public ResponseEntity<JsonExceptionResponse> handleExpiredTokensException(RuntimeException ex) {
        return new ResponseEntity<>(new JsonExceptionResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED.value()), HttpStatus.UNAUTHORIZED);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(objectError -> ((FieldError) objectError).getField() + " " + objectError.getDefaultMessage()).collect(Collectors.toList());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    private Map<String, List<String>> getErrorsMap(List<String> errors) {
        Map<String, List<String>> errorResponse = new HashMap<>();
        errorResponse.put("errors", errors);
        return errorResponse;
    }
}
