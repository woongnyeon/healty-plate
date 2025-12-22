package com.healthy_plate.shared.error.exception;

public enum AuthenticationErrorCode implements ErrorCode {

    LOGIN_REQUIRED_SERVICE("A101", "로그인이 필요한 서비스입니다"),
    INVALID_REFRESH_TOKEN("A102", "유효하지 않은 Refresh Token 입니다"),
    REFRESH_TOKEN_NOT_FOUND("A103", "Refresh Token을 찾을 수 없습니다"),
    EXPIRED_REFRESH_TOKEN("A104", "만료된 Refresh Token입니다"),
    USER_NOT_FOUND("A105", "사용자를 찾을 수 없습니다"),
    INVALID_ACCESS_TOKEN("A106", "유효하지 않은 Access Token 입니다"),
    EXPIRED_ACCESS_TOKEN("A107", "만료된 Access Token입니다"),
    ALREADY_REGISTERED_NICKNAME("A108", "이미 닉네임이 등록된 사용자입니다"),
    OAUTH2_LOGIN_FAILED("A109", "소셜 로그인에 실패했습니다");

    private final String code;
    private final String message;

    AuthenticationErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
