package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.StudentDTO;

import java.util.List;

public interface StudentService {
    StudentDTO getStudentProfileByUserId(Long userId);
    StudentDTO updateStudentProfileByUserId(Long userId, StudentDTO studentDTO);
    void deleteStudentByUserId(Long userId);
    List<StudentDTO> getStudentsByCompanyHr(Long userId);


}
