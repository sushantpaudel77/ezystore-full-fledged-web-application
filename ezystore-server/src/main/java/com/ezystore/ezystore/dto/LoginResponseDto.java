package com.ezystore.ezystore.dto;

public record LoginResponseDto(String message, UserDto user, String jwtToken) {
}
