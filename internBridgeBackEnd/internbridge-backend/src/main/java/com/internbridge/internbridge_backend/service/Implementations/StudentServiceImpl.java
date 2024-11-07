package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.StudentRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.StudentService;
import com.internbridge.internbridge_backend.service.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    @Lazy
    private UserService userService;

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

        student.setName(studentDTO.getName());
        student.setEmail(studentDTO.getEmail());
        student.setCompany(studentDTO.getCompany());
        student.setPhone(studentDTO.getPhone());

        student.setStatus(studentDTO.getStatus());
        student.setScNumber(studentDTO.getScNumber());
        student.setGpa(studentDTO.getGpa());
        student.setPosition(studentDTO.getPosition());


        modelMapper.map(studentDTO, student);
        if (studentDTO.getCompanyHrId() != null) {
            User companyHr = userRepository.findById(studentDTO.getCompanyHrId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company HR not found with id " + studentDTO.getCompanyHrId()));
            student.setCompanyHr(companyHr);
        }

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

    @Override
    public List<StudentDTO> getFilteredStudents(String email,String role) {
        List<Student> students = studentRepository.findByEmailOrRole(email, role);
        return students.stream()
                .map(student -> modelMapper.map(student, StudentDTO.class)) // Mapping to StudentDTO
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(student -> modelMapper.map(student, StudentDTO.class))
                .collect(Collectors.toList());
    }

}

