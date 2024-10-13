package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByEmail(String email);

    Optional<Student> findById(Long UserId);

}
