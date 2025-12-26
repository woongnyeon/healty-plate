package com.healthy_plate.auth.presentation;

import com.healthy_plate.auth.application.AuthService;
import com.healthy_plate.auth.domain.model.JwtProperties;
import com.healthy_plate.auth.infrastructure.util.CookieUtil;
import com.healthy_plate.auth.presentation.dto.TokenResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController implements SwaggerAuthController {

    private static final String REFRESH_TOKEN_NAME = "refresh_token";

    private final AuthService authService;
    private final JwtProperties jwtProperties;

    @Value("${app.cookie.secure}")
    private boolean cookieSecure;

    @PostMapping("/token")
    public ResponseEntity<TokenResponse> getAccessToken(
        final HttpServletRequest request
    ) {
        String refreshToken = CookieUtil.findRefreshTokenWithCookie(request.getCookies());
        String newAccessToken = authService.generateAccessToken(refreshToken);

        return ResponseEntity.ok(new TokenResponse(newAccessToken));
    }


    @PatchMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TokenResponse> registerUserInfo(
        @RequestPart("nickname") final String nickname,
        @RequestPart(value = "profileImage", required = false) final MultipartFile profileImage,
        @RequestPart(value = "introduction", required = false) final String introduction,
        final HttpServletRequest httpRequest
    ) {
        String refreshToken = CookieUtil.findRefreshTokenWithCookie(httpRequest.getCookies());
        String accessToken = authService.registerUserInfo(refreshToken, nickname, profileImage, introduction);

        return ResponseEntity.ok(new TokenResponse(accessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
        @CookieValue(name = "refresh_token") final String refreshToken,
        final HttpServletResponse response
    ) {
        authService.logout(refreshToken);

        Cookie refreshTokenCookie = CookieUtil.deleteCookie(REFRESH_TOKEN_NAME);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok().build();
    }
}
