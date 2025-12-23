package com.healthy_plate.user.presentation.dto;

import com.healthy_plate.user.domain.model.UserProfile;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "사용자 프로필 정보")
public record UserProfileResponse(
    @Schema(description = "닉네임", example = "홍길동")
    String nickname,

    @Schema(description = "프로필 이미지 URL", example = "https://example.com/profile.jpg")
    String profileImageUrl,

    @Schema(description = "자기소개", example = "안녕하세요. 건강한 식단에 관심이 많습니다.")
    String introduction
) {

    public static UserProfileResponse from(UserProfile profile) {
        if (profile == null) {
            return null;
        }
        return new UserProfileResponse(
            profile.getNickname(),
            profile.getProfileImageUrl(),
            profile.getIntroduction()
        );
    }
}