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
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public StudentDTO createStudent(StudentDTO studentDTO) {
//        User user = new User();
//        user.setName(studentDTO.getName());
//        user.setEmail(studentDTO.getEmail());
//        user.setPassword(studentDTO.getPassword());
//        user.setCompany(studentDTO.getCompany());
//        user.setPhone(studentDTO.getPhone());
//        user.setRole(studentDTO.getRole());
//        user.setStatus(studentDTO.getStatus());
//        User savedUser = userRepository.save(user);
//
//        Student student = new Student();
//        student.setUserId(savedUser.getUserId());
//        student.setScNumber(studentDTO.getScNumber());
//        student.setGpa(studentDTO.getGpa());
//        student.setPosition(studentDTO.getPosition());
//        //student.setCompanyHr(studentDTO.getCompanyHrId());
//
//        Student savedStudent = studentRepository.save(student);
//
//        // Map saved entities to StudentDTO
//        return modelMapper.map(savedStudent, StudentDTO.class);

        //StudentDTO.set(passwordEncoder.encode(StudentDTO.getPassword()));

        studentDTO.setPassword(passwordEncoder.encode(studentDTO.getPassword()));



        Student student = modelMapper.map(studentDTO, Student.class);
        System.out.println("Received Student Data: " + student);

        // Ensure the role is set to "student"
        student.setRole("ROLE_STUDENT");

        // Save student to the database
        Student savedStudent = studentRepository.save(student);


        return modelMapper.map(savedStudent, StudentDTO.class);
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

        Student updatedStudent = studentRepository.save(student);

        return modelMapper.map(updatedStudent, StudentDTO.class);
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
    public List<StudentDTO> getFilteredStudents(String email,String status) {
        List<Student> students = studentRepository.findByEmailOrRole(email, status);
        return students.stream()
                .map(student -> modelMapper.map(student, StudentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return studentRepository.findAll().stream()
                .map(student -> StudentDTO.builder()
                        .userId(student.getUserId())
                        .name(student.getName())
                        .email(student.getEmail())
                        .phone(student.getPhone())
                        .status(student.getStatus())
                        .scNumber(student.getScNumber())
                        .gpa(student.getGpa())
                        .position(student.getPosition())

                        .build()
                )
                .collect(Collectors.toList());
    }

    @Override
    public StudentDTO assignCompanyHr(Long userId, Long companyHrId) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID " + userId));

        User companyHr = userRepository.findById(companyHrId)
                .orElseThrow(() -> new ResourceNotFoundException("Company HR not found with ID " + companyHrId));

        // Set the company HR reference
        student.setCompanyHr(companyHr);

        Student updatedStudent = studentRepository.save(student);
        return modelMapper.map(updatedStudent, StudentDTO.class);
    }

}

