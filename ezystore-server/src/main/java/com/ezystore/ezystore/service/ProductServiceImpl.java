package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ProductDto;
import com.ezystore.ezystore.entity.Product;
import com.ezystore.ezystore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::transformToDto).toList();
    }

    private ProductDto transformToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setPopularity(product.getPopularity());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }
}
