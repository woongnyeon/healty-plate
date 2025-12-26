package com.healthy_plate.user.presentation;

import com.healthy_plate.user.application.UserService;
import com.healthy_plate.user.domain.model.User;
import com.healthy_plate.user.presentation.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController implements SwaggerUserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal final Long userId) {
        final User user = userService.findUser(userId);
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @GetMapping("/duplicate/{nickname}")
    public ResponseEntity<Boolean> isDuplicatedNickname(@PathVariable final String nickname) {
        final boolean duplicated = userService.isDuplicatedNickname(nickname);
        return ResponseEntity.ok(duplicated);
    }

    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResponse> updateProfile(
        @AuthenticationPrincipal final Long userId,
        @RequestPart(value = "nickname", required = false) final String nickname,
        @RequestPart(value = "profileImage", required = false) final MultipartFile profileImage,
        @RequestPart(value = "introduction", required = false) final String introduction
    ) {
        final User updatedUser = userService.updateUserProfile(userId, nickname, profileImage, introduction);
        return ResponseEntity.ok(UserResponse.from(updatedUser));
    }
}