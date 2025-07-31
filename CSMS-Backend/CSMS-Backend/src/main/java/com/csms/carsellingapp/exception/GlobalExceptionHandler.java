package com.csms.carsellingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException exception){
        Map<String,String> response = new HashMap<>();
        response.put("message" , exception.getMessage());
        response.put("Date" , new Date().toString());
        return  new ResponseEntity<>(response , HttpStatus.BAD_REQUEST);
    }
}

