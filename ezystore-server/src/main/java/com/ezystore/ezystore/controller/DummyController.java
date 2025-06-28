package com.ezystore.ezystore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {

    @GetMapping
    public Map<String, Object> getProductDetails() {
        Map<String, Object> product = new HashMap<>();
        product.put("productId", 101);
        product.put("name", "Vinyl Stickers Pack");
        product.put("price", "$4.99");
        product.put("description", "A set of 10 high-quality waterproof stickers.");
        product.put("inStock", true);
        product.put("category", "Stationery");

        List<String> features = Arrays.asList(
                "Waterproof",
                "Glossy finish",
                "Easy peel backing",
                "Eco-friendly ink"
        );
        product.put("features", features);

        return product;
    }
}
