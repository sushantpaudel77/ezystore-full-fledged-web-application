package com.ezystore.ezystore.dto;

import lombok.Data;

@Data
public class ProfileResponseDto {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private boolean emailUpdated;
}
