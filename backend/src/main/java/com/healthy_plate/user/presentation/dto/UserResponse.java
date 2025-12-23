package com.healthy_plate.user.presentation.dto;

import com.healthy_plate.user.domain.model.User;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "사용자 정보")
public record UserResponse(
    @Schema(description = "사용자 ID", example = "1")
    Long id,

    @Schema(description = "이메일", example = "user@example.com")
    String email,

    @Schema(description = "프로필 정보")
    UserProfileResponse profile,

    @Schema(description = "OAuth2 제공자", example = "GOOGLE")
    String provider
) {

    public static UserResponse from(User user) {
        return new UserResponse(
            user.getId(),
            user.getEmail().getValue(),
            UserProfileResponse.from(user.getProfile()),
            user.getProvider().name()
        );
    }
}