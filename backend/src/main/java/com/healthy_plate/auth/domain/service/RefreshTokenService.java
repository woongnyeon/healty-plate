package com.healthy_plate.auth.domain.service;

import com.healthy_plate.auth.domain.model.RefreshToken;
import com.healthy_plate.auth.domain.repository.RefreshTokenRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveRefreshToken(final Long userId, final String token, long refreshTokenExpiration) {
        Optional<RefreshToken> existing = refreshTokenRepository.findByUserId(userId);

        if (existing.isPresent() && !existing.get().isExpired()) {
            // 유효한 토큰이 있으면 새로 저장하지 않음
            return;
        }

        // 만료된 토큰 삭제
        existing.ifPresent(old -> refreshTokenRepository.deleteByToken(old.getToken()));

        final LocalDateTime expiryDate = LocalDateTime.now().plusSeconds(refreshTokenExpiration / 1000);
        final RefreshToken refreshToken = new RefreshToken(token, userId, expiryDate);
        refreshTokenRepository.save(refreshToken);
    }
}
