package com.healthy_plate.auth.infrastructure.oauth2;

import java.util.Map;

public class KakaoOAuth2UserInfo implements OAuth2UserInfo {

    private static final String PROVIDER = "kakao";

    private final Map<String, Object> attributes;
    private final Map<String, Object> kakaoAccount;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccount = extractMap(attributes.get("kakao_account"), "kakao_account");
    }

    @Override
    public String getProvider() {
        return PROVIDER;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return kakaoAccount.get("email").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> profile = extractMap(kakaoAccount.get("profile"), "profile");
        return profile.get("nickname").toString();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extractMap(Object obj, String fieldName) {
        if (obj instanceof Map) {
            return (Map<String, Object>) obj;
        } else {
            throw new IllegalArgumentException("Invalid " + fieldName + " structure in OAuth2 response");
        }
    }
}
