package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ProfileRequestDto;
import com.ezystore.ezystore.dto.ProfileResponseDto;

public interface ProfileService {
    ProfileResponseDto getProfile();
    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
