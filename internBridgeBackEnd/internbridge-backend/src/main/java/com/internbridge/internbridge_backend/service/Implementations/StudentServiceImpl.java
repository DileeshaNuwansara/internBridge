package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.StudentRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public StudentDTO getStudentProfileByUserId(Long userId) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + userId));

        return modelMapper.map(student, StudentDTO.class);
    }

    @Override
    public StudentDTO updateStudentProfileByUserId(Long userId, StudentDTO studentDTO) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + userId));




        modelMapper.map(studentDTO, student);

        studentRepository.save(student);

        return modelMapper.map(student, StudentDTO.class);
    }

    @Override
    public void deleteStudentByUserId(Long userId) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + userId));

        studentRepository.delete(student);
    }

    @Override
    public List<StudentDTO> getStudentsByCompanyHr(Long companyHrId) {
        User companyHr = new User();
        companyHr.setUserId(companyHrId);

        List<Student> students = studentRepository.findByCompanyHr(companyHr);
        return students.stream().map(student -> modelMapper.map(student, StudentDTO.class)).collect(Collectors.toList());
    }
}

