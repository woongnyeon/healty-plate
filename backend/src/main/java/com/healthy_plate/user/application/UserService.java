package com.healthy_plate.user.application;

import com.healthy_plate.shared.error.exception.BusinessErrorCode;
import com.healthy_plate.shared.error.exception.BusinessException;
import com.healthy_plate.user.domain.model.User;
import com.healthy_plate.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
}
