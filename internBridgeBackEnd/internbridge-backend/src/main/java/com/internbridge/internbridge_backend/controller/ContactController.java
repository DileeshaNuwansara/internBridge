package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.ContactDTO;
import com.internbridge.internbridge_backend.dto.MailBody;
import com.internbridge.internbridge_backend.entity.Contact;
import com.internbridge.internbridge_backend.service.ContactService;
import com.internbridge.internbridge_backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private MailService mailService;


    @PostMapping("/create")
    public ResponseEntity<Contact> createContact(@RequestBody ContactDTO contactDTO) {
        try {
            Contact contact = contactService.saveContact(contactDTO);
            return ResponseEntity.status(201).body(contact);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Contact>> getAllContacts() {
        try {
            return ResponseEntity.ok(contactService.getAllContacts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        try {
            Contact contact = contactService.getContactById(id);
            return ResponseEntity.ok(contact);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Contact> approveContact(@PathVariable Long id) {
        try {
            Contact contact = contactService.approveContact(id);
            contact.setStatus("Approved");
            contactService.save(contact);

            // Send email with login details
            String defaultPassword = "S@yHellow12345";
            String emailContent = String.format(
                    "Welcome to InternBridge, %s! Your account has been approved.\n\nUsername: %s\nPassword: %s\nPlease log in and change your password.",
                    contact.getCompany(), contact.getEmail(), defaultPassword
            );

            mailService.sendSimpleMessage(new MailBody(contact.getEmail(), "InternBridge HR Account Approved", emailContent));

            return ResponseEntity.ok(contact);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Contact>> getApprovedContacts() {
        try {
            return ResponseEntity.ok(contactService.getApprovedContacts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
