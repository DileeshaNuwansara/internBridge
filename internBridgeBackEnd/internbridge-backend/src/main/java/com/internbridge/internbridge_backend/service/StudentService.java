package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.StudentDTO;

import java.util.List;

public interface StudentService {
    StudentDTO getStudentProfile(String email);
    StudentDTO updateStudentProfile(String email, StudentDTO studentDTO);

    void deleteStudent(Long id);

}
