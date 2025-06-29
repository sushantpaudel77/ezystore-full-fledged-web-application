package com.ezystore.ezystore.service;

import com.ezystore.ezystore.entity.Customer;
import com.ezystore.ezystore.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerRepository customerRepository;

    @Override
    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow(() ->
                new UsernameNotFoundException("Customer Not found with the ID: " + customerId));
    }
}
