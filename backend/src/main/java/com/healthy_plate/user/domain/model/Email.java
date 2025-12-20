package com.healthy_plate.user.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Email {

    @Column(name = "email", nullable = false, unique = true)
    private String value;


    public static Email of(String value) {
        validateEmail(value);

        Email email = new Email();
        email.value = value.toLowerCase().trim();
        return email;
    }

    private static void validateEmail(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("이메일은 필수입니다.");
        }
    }
}
