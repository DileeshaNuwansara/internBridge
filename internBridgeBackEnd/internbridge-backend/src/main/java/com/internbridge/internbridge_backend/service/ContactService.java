package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.ContactDTO;
import com.internbridge.internbridge_backend.entity.Contact;

import java.util.List;

public interface ContactService {
    Contact saveContact(ContactDTO contactDTO);

    List<Contact> getAllContacts();

    Contact save(Contact contact);

    Contact getContactById(Long id);

    void deleteContact(Long id);

    List<Contact> getApprovedContacts();

    Contact approveContact(Long id);
}