package com.ezystore.ezystore.dto;

import lombok.Data;

@Data
public class ContactRequestDto {
    private String name;
    private String email;
    private String mobileNumber;
    private String message;
}
