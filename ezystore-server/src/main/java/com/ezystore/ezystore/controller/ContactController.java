package com.ezystore.ezystore.controller;

import com.ezystore.ezystore.dto.ContactRequestDto;
import com.ezystore.ezystore.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(path = "api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<String> saveContact(@RequestBody ContactRequestDto contactRequestDto) {
        boolean isSaved = contactService.saveContact(contactRequestDto);
        return isSaved ?
                 ResponseEntity.ok("Request processed successfully")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred. Please try again or contact Dev team");
    }
}
