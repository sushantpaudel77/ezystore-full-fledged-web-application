package com.ezystore.ezystore.controller;

import com.ezystore.ezystore.dto.ProductDto;
import com.ezystore.ezystore.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() throws InterruptedException {
        log.info("fetching products from the server");
        var productsList = productService.getProducts();
        return ResponseEntity.ok(productsList);
    }
}
