package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.Student;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface StudentService {
    StudentDTO createStudent(StudentDTO studentDTO);
    StudentDTO getStudentProfileByUserId(Long userId);
    StudentDTO updateStudentProfileByUserId(Long userId, StudentDTO studentDTO);
    void deleteStudentByUserId(Long userId);
    List<StudentDTO> getStudentsByCompanyHr(Long userId);
    List<StudentDTO> getFilteredStudents(String email, String status);
    List<StudentDTO> getAllStudents();

    StudentDTO assignCompanyHr(Long userId, Long companyHrId);



}
