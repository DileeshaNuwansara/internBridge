package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.ContactDTO;
import com.internbridge.internbridge_backend.entity.Contact;
import com.internbridge.internbridge_backend.repository.ContactRepository;
import com.internbridge.internbridge_backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;


    @Override
    public Contact saveContact(ContactDTO contactDTO) {
        try {
            Contact contact = new Contact();
            contact.setName(contactDTO.getName());
            contact.setEmail(contactDTO.getEmail());
            contact.setPhone(contactDTO.getPhone());
            contact.setMessage(contactDTO.getMessage());
            contact.setCompany(contactDTO.getCompany());
            contact.setAvailablePositions(contactDTO.getAvailablePositions());
            return contactRepository.save(contact);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save contact: " + e.getMessage());
        }
    }

    @Override
    public List<Contact> getAllContacts() {
        try {
            return contactRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch contacts: " + e.getMessage());
        }
    }

    @Override
    public Contact save(Contact contact) {
        return contactRepository.save(contact); // Save the updated contact
    }

    @Override
    public Contact getContactById(Long id) {
        try {
            return contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch contact by ID: " + e.getMessage());
        }
    }

    @Override
    public void deleteContact(Long id) {
        try {
            contactRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete contact: " + e.getMessage());
        }
    }

    @Override
    public List<Contact> getApprovedContacts() {
        try {
            return contactRepository.findByStatus("Approved");
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch approved contacts: " + e.getMessage());
        }
    }

    @Override
    public Contact approveContact(Long id) {
        try {
            Contact contact = getContactById(id);
            contact.setStatus("Approved");
            return contactRepository.save(contact);
        } catch (Exception e) {
            throw new RuntimeException("Failed to approve contact: " + e.getMessage());
        }
    }
}


