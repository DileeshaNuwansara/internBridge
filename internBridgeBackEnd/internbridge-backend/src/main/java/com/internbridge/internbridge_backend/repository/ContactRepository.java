package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByStatus(String status);
}
