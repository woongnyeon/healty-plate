package com.healthy_plate.auth.presentation;

import com.healthy_plate.auth.presentation.dto.TokenResponse;
import com.healthy_plate.shared.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "인증", description = "인증 관련 API")
public interface SwaggerAuthController {

    @Operation(
        summary = "액세스 토큰 갱신",
        tags = "인증",
        description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "토큰 갱신 성공",
                content = @Content(
                    schema = @Schema(implementation = TokenResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "401",
                description = "유효하지 않은 리프레시 토큰",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "잘못된 요청",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            )
        }
    )
    ResponseEntity<TokenResponse> getAccessToken(HttpServletRequest request);


    @Operation(
        summary = "프로필 등록 (회원가입 완료)",
        tags = "인증",
        description = "OAuth2 로그인 후 사용자의 프로필(닉네임, 프로필 이미지, 자기소개)을 등록하고 액세스 토큰을 반환합니다. 닉네임은 필수이며, 프로필 이미지와 자기소개는 선택사항입니다.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "프로필 등록 성공",
                content = @Content(
                    schema = @Schema(implementation = TokenResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "잘못된 요청 (유효성 검증 실패, 파일 형식 오류, 파일 크기 초과 등)",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "401",
                description = "유효하지 않은 리프레시 토큰",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            )
        }
    )
    ResponseEntity<TokenResponse> registerUserInfo(
        @Parameter(description = "닉네임 (필수, 2-50자)", required = true, example = "건강한식단") String nickname,
        @Parameter(description = "프로필 이미지 파일 (선택, jpg, jpeg, png, gif / 최대 5MB)") MultipartFile profileImage,
        @Parameter(description = "자기소개 (선택, 최대 500자)", example = "건강한 식단을 추구합니다!") String introduction,
        HttpServletRequest httpRequest
    );

    @Operation(
        summary = "로그아웃",
        tags = "인증",
        description = "사용자를 로그아웃하고 리프레시 토큰을 무효화합니다.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "로그아웃 성공",
                content = @Content(
                    schema = @Schema(implementation = Void.class)
                )
            ),
            @ApiResponse(
                responseCode = "401",
                description = "유효하지 않은 리프레시 토큰",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "잘못된 요청",
                content = @Content(
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            )
        }
    )
    ResponseEntity<Void> logout(
        @CookieValue(name = "refresh_token") String refreshToken,
        HttpServletResponse response
    );
}