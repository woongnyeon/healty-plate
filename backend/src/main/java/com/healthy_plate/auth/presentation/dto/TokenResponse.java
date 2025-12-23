package com.healthy_plate.auth.presentation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TokenResponse(
    @JsonProperty("access_token")
    String accessToken
) {

}