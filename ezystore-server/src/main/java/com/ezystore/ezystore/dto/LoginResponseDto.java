package com.ezystore.ezystore.dto;

public record LoginResponseDto(String message, UserDto userDto, String jwtToken) {
}
