package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface StudentService {
    StudentDTO getStudentProfileByUserId(Long userId);
    StudentDTO updateStudentProfileByUserId(Long userId, StudentDTO studentDTO);
    void deleteStudentByUserId(Long userId);
    List<StudentDTO> getStudentsByCompanyHr(Long userId);
    List<StudentDTO> getFilteredStudents(String email);


}
