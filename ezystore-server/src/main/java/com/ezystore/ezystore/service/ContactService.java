package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ContactRequestDto;

public interface ContactService {
    boolean saveContact(ContactRequestDto contactRequestDto);
}
