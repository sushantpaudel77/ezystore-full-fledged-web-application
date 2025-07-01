package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ProfileRequestDto;
import com.ezystore.ezystore.dto.ProfileResponseDto;
import com.ezystore.ezystore.entity.Address;
import com.ezystore.ezystore.entity.Customer;
import com.ezystore.ezystore.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final CustomerRepository customerRepository;

    public ProfileServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        return mapCustomerToDto(customer);
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = getAddress(profileRequestDto, customer);
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToDto(customer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        return profileResponseDto;
    }

    private static Address getAddress(ProfileRequestDto profileRequestDto, Customer customer) {
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setMobileNumber(profileRequestDto.getMobileNumber());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        return address;
    }

    private Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private ProfileResponseDto mapCustomerToDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            profileResponseDto.setStreet(customer.getAddress().getStreet());
            profileResponseDto.setCity(customer.getAddress().getCity());
            profileResponseDto.setState(customer.getAddress().getState());
            profileResponseDto.setPostalCode(customer.getAddress().getPostalCode());
            profileResponseDto.setCountry(customer.getAddress().getCountry());
            profileResponseDto.setMobileNumber(customer.getAddress().getMobileNumber());
        }
        return profileResponseDto;
    }
}
