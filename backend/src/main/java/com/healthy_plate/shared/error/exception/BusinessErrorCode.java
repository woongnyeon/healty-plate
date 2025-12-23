package com.healthy_plate.shared.error.exception;

import org.springframework.http.HttpStatus;

public enum BusinessErrorCode implements ErrorCode {

    USER_NOT_FOUND("B101", "사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus status;

    BusinessErrorCode(String code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
