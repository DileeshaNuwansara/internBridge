package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Internship;
import com.internbridge.internbridge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByUser(User user);
}
