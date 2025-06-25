package com.ezystore.ezystore.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long productId;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer popularity;
    private String imageUrl;
}
