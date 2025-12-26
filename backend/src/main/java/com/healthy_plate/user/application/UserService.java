package com.healthy_plate.user.application;

import com.healthy_plate.shared.error.exception.BusinessErrorCode;
import com.healthy_plate.shared.error.exception.BusinessException;
import com.healthy_plate.shared.s3.S3FileUploadService;
import com.healthy_plate.user.domain.model.User;
import com.healthy_plate.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final S3FileUploadService s3FileUploadService;

    public User findUser(final Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new BusinessException(BusinessErrorCode.USER_NOT_FOUND));
    }

    public boolean isDuplicatedNickname(final String nickname) {
        if (nickname == null || nickname.isBlank()) {
            throw new IllegalArgumentException("닉네임은 null이거나 공백일 수 없습니다.");
        }
        return userRepository.existsByProfileNickname(nickname);
    }

    @Transactional
    public User updateUserProfile(
        final Long userId,
        final String nickname,
        final MultipartFile profileImage,
        final String introduction
    ) {
        User user = findUser(userId);

        // 기존 프로필 정보 가져오기
        String currentNickname = user.getProfile() != null ? user.getProfile().getNickname() : null;
        String currentProfileImageUrl = user.getProfile() != null ? user.getProfile().getProfileImageUrl() : null;
        String currentIntroduction = user.getProfile() != null ? user.getProfile().getIntroduction() : null;

        // 업데이트할 값 결정 (null이면 기존 값 유지)
        String newNickname = nickname != null ? nickname : currentNickname;
        String newIntroduction = introduction != null ? introduction : currentIntroduction;
        String newProfileImageUrl = currentProfileImageUrl;

        // 새로운 프로필 이미지가 있으면 업로드
        if (profileImage != null && !profileImage.isEmpty()) {
            // 기존 이미지가 있으면 삭제
            if (currentProfileImageUrl != null) {
                s3FileUploadService.deleteFile(currentProfileImageUrl);
            }
            // 새 이미지 업로드
            newProfileImageUrl = s3FileUploadService.uploadProfileImage(profileImage, userId);
        }

        // 프로필 업데이트
        user.updateProfile(newNickname, newProfileImageUrl, newIntroduction);

        return user;
    }
}
