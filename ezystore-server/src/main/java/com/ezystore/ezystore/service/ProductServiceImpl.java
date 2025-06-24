package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ProductDto;
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
        return List.of();
    }
}
