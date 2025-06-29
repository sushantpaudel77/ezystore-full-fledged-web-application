package com.ezystore.ezystore.repository;

import com.ezystore.ezystore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmailOrMobileNumber(String email, String mobileNumber);
}