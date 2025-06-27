package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ProductDto;
import com.ezystore.ezystore.entity.Product;
import com.ezystore.ezystore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
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
        BeanUtils.copyProperties(product, dto);
        dto.setProductId(product.getId());
        throw new RuntimeException("Oops something went wrong!");
//        return dto;
    }
}
