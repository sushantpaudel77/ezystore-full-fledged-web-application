package com.ezystore.ezystore.service;

import com.ezystore.ezystore.entity.Customer;

public interface CustomerService {
    Customer getCustomerById(Long customerId);
}
