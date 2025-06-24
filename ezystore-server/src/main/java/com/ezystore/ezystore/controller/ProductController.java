package com.ezystore.ezystore.controller;

import com.ezystore.ezystore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    public ResponseEntity<ProductDto> getProducts() {
        var productsList = productService.getProducts();
        return ResponseEntity.of(productsList);
    }
}
