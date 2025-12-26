package com.healthy_plate.auth.application;

import com.healthy_plate.auth.domain.model.JwtTokenProvider;
import com.healthy_plate.auth.domain.model.RefreshToken;
import com.healthy_plate.auth.domain.repository.RefreshTokenRepository;
import com.healthy_plate.shared.error.exception.AuthenticationErrorCode;
import com.healthy_plate.shared.error.exception.BusinessErrorCode;
import com.healthy_plate.shared.error.exception.CustomAuthenticationException;
import com.healthy_plate.shared.s3.S3FileUploadService;
import com.healthy_plate.user.domain.model.User;
import com.healthy_plate.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final S3FileUploadService s3FileUploadService;

    @Transactional
    public String generateAccessToken(final String refreshTokenValue) {
        if (!jwtTokenProvider.validateToken(refreshTokenValue)) {
            throw new CustomAuthenticationException(AuthenticationErrorCode.INVALID_REFRESH_TOKEN);
        }

        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
            .orElseThrow(() -> new CustomAuthenticationException(AuthenticationErrorCode.REFRESH_TOKEN_NOT_FOUND));

        if (refreshToken.isExpired()) {
            refreshTokenRepository.deleteByToken(refreshTokenValue);
            throw new CustomAuthenticationException(AuthenticationErrorCode.EXPIRED_REFRESH_TOKEN);
        }
        User user = userRepository.findById(refreshToken.getUserId())
            .orElseThrow(() -> new CustomAuthenticationException(BusinessErrorCode.USER_NOT_FOUND));

        // 프로필 미등록 사용자 차단
        if (user.isFirstLogin()) {
            throw new CustomAuthenticationException(AuthenticationErrorCode.PROFILE_REGISTRATION_REQUIRED);
        }

        return jwtTokenProvider.generateAccessToken(
            user.getId(),
            user.getEmail().getValue(),
            user.getRole()
        );
    }

    @Transactional
    public User getUserFromRefreshToken(final String refreshTokenValue) {
        if (!jwtTokenProvider.validateToken(refreshTokenValue)) {
            throw new CustomAuthenticationException(AuthenticationErrorCode.INVALID_REFRESH_TOKEN);
        }

        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
            .orElseThrow(() -> new CustomAuthenticationException(AuthenticationErrorCode.REFRESH_TOKEN_NOT_FOUND));

        if (refreshToken.isExpired()) {
            refreshTokenRepository.deleteByToken(refreshTokenValue);
            throw new CustomAuthenticationException(AuthenticationErrorCode.EXPIRED_REFRESH_TOKEN);
        }

        return userRepository.findById(refreshToken.getUserId())
            .orElseThrow(() -> new CustomAuthenticationException(BusinessErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public String registerUserInfo(
        final String refreshTokenValue,
        final String nickname,
        final MultipartFile profileImage,
        final String introduction
    ) {
        User user = getUserFromRefreshToken(refreshTokenValue);

        // 프로필 이미지 업로드 (있을 경우)
        String profileImageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = s3FileUploadService.uploadProfileImage(profileImage, user.getId());
        }

        // 프로필 업데이트
        user.updateProfile(nickname, profileImageUrl, introduction);
        userRepository.save(user);

        return jwtTokenProvider.generateAccessToken(
            user.getId(),
            user.getEmail().getValue(),
            user.getRole()
        );
    }

    @Transactional
    public void logout(String refreshTokenValue) {
        refreshTokenRepository.deleteByToken(refreshTokenValue);
    }
}
