package com.ezystore.ezystore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 5, max = 50, message = "Name must be between 5 and 50 characters")
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
            regexp = "^[0-9]{10,15}$",
            message = "Mobile number must be between 10 and 15 digits"
    )
    private String mobileNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Postal code is required")
    @Pattern(
            regexp = "^[0-9]{4,10}$",
            message = "Postal code must be numeric and between 4 to 10 digits"
    )
    private String postalCode;

    @NotBlank(message = "Country is required")
    private String country;
}
