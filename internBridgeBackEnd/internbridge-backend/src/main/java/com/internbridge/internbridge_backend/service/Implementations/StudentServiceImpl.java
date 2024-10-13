package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.repository.StudentRepository;
import com.internbridge.internbridge_backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;


    @Override
    public StudentDTO getStudentProfile(String email) {
        Student student = studentRepository.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }
        return mapToDTO(student);
    }

    @Override
    public StudentDTO updateStudentProfile(String email, StudentDTO studentDTO) {
        Student student = studentRepository.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }
        student.setName(student.getName());
        student.setEmail(student.getEmail());
        student.setCompany(student.getCompany());
        student.setPhone(student.getPhone());
        student.setStatus(student.getStatus());
        student.setScNumber(studentDTO.getScNumber());
        student.setGpa(Double.valueOf(Double.valueOf(Double.valueOf(studentDTO.getGpa()))));
        student.setPosition(studentDTO.getPosition());
        student.setCv(studentDTO.getCv());
        studentRepository.save(student);
        return mapToDTO(student);
    }




    @Override
    public void deleteStudent(Long id) {
        // Find the student by ID
        Student student = studentRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Student not found with id: " + id)
        );

        studentRepository.delete(student);
    }

    private StudentDTO mapToDTO(Student student) {
        return new StudentDTO(
                student.getUserId(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                student.getRole(),
                student.getScNumber(),
                student.getGpa(),
                student.getPosition(),
                student.getCv()
        );
    }
}
