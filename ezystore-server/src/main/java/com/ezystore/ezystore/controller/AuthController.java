package com.ezystore.ezystore.controller;

import com.ezystore.ezystore.dto.LoginRequestDto;
import com.ezystore.ezystore.dto.LoginResponseDto;
import com.ezystore.ezystore.dto.RegisterRequestDto;
import com.ezystore.ezystore.dto.UserDto;
import com.ezystore.ezystore.entity.Customer;
import com.ezystore.ezystore.entity.Roles;
import com.ezystore.ezystore.repository.CustomerRepository;
import com.ezystore.ezystore.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final CompromisedPasswordChecker compromisedPasswordChecker;
    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> apiLogin(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            var authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(loginRequestDto.username(),
                    loginRequestDto.password()));
            var userDto = new UserDto();
            var loggedInUser = (Customer) authentication.getPrincipal();
            BeanUtils.copyProperties(loggedInUser, userDto);
            userDto.setRoles(authentication.getAuthorities().stream().map(
                    GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
            String jwtToken = jwtUtil.generateJwtToken(authentication);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new LoginResponseDto(HttpStatus.OK.getReasonPhrase(), userDto, jwtToken));
        } catch (BadCredentialsException ex) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Invalid username or password");
        } catch (AuthenticationException ex) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Authentication failed");
        } catch (Exception ex) {
            return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An unexpected error occurred");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequestDto) {
        CompromisedPasswordDecision passwordChecker = compromisedPasswordChecker.check(registerRequestDto.getPassword());
        if (passwordChecker.isCompromised()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("password", "Choose a strong password"));
        }
        Optional<Customer> existingCustomer = customerRepository.findByEmailOrMobileNumber(registerRequestDto.getEmail(), registerRequestDto.getMobileNumber());
        if (existingCustomer.isPresent()) {
            Map<String, String> errors = new HashMap<>();
            Customer customer = existingCustomer.get();
            if (customer.getEmail().equalsIgnoreCase(registerRequestDto.getEmail())) {
                errors.put("email", "Email is already registered");
            }
            if (customer.getMobileNumber().equals(registerRequestDto.getMobileNumber())) {
                errors.put("mobileNumber", "Mobile number is already registered");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        Customer customer = new Customer();
        BeanUtils.copyProperties(registerRequestDto, customer);
        customer.setPasswordHash(passwordEncoder.encode(registerRequestDto.getPassword()));
        Roles roles = new Roles();
        customer.setRoles(Set.of(roles));
        customerRepository.save(customer);
        return ResponseEntity.
                status(HttpStatus.CREATED)
                .body("Registration successfully");
    }

    private ResponseEntity<LoginResponseDto> buildErrorResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(new LoginResponseDto(message, null, null));
    }
}
