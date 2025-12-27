package com.healthy_plate.shared.s3;

import jakarta.validation.constraints.NotBlank;

public record PresignedUrlRequest(
    @NotBlank(message = "contentType은 필수입니다.")
    String contentType
) {

}