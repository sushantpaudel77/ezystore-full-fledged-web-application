package com.ezystore.ezystore.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String name;
    private String email;
    private String mobileNumber;
}
