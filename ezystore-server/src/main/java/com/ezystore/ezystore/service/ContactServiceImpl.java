package com.ezystore.ezystore.service;

import com.ezystore.ezystore.dto.ContactRequestDto;
import com.ezystore.ezystore.entity.Contact;
import com.ezystore.ezystore.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactRequestDto contactRequestDto) {
            Contact contact = transformDtoToEntity(contactRequestDto);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactRequestDto.getName());
            contactRepository.save(contact);
            return true;
    }

    private Contact transformDtoToEntity(ContactRequestDto contactRequestDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDto, contact);
        return contact;
    }
}