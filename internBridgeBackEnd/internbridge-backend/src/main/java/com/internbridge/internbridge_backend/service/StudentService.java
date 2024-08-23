package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.StudentDto;

import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentById(long id);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long studentId, StudentDto updatedStudentDto);

    void deleteStudent(Long studentId);
}
