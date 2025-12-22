package com.healthy_plate.auth.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthy_plate.shared.error.ErrorResponse;
import com.healthy_plate.shared.error.exception.AuthenticationErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final AuthenticationException authException
    ) throws IOException, ServletException {

        log.warn("인증 실패 - URI: {} {}, 원인: {}",
            request.getMethod(), request.getRequestURI(), authException.getMessage());

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        ErrorResponse errorResponse = new ErrorResponse(
            401,
            AuthenticationErrorCode.LOGIN_REQUIRED_SERVICE.getCode(),
            AuthenticationErrorCode.LOGIN_REQUIRED_SERVICE.getMessage(),
            request.getMethod(),
            request.getRequestURI()
        );

        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}