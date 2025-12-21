package com.healthy_plate.shared.error.exception;

import lombok.Getter;

@Getter
public class AuthenticationException extends RuntimeException {

    private final ErrorCode errorCode;

    public AuthenticationException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
