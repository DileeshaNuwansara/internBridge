package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.StudentDto;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.mapper.StudentMapper;
import com.internbridge.internbridge_backend.repository.StudentRepository;
import com.internbridge.internbridge_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImplementation implements StudentService {

    private StudentRepository studentRepository;


    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        //convert DTO into entity
        Student student = StudentMapper.mapToStudent(studentDto);
        //save entity using student repository
        Student savedStudent = studentRepository.save(student);
        //getting saved entity to client back to Dto

        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Student not found by given Id: " + studentId));
        return StudentMapper.mapToStudentDto(student);
    }




    @Override
    public List<StudentDto> getAllStudents() {
            List<Student> students = studentRepository.findAll();
            return students.stream().map((student) -> StudentMapper.mapToStudentDto(student))
                    .collect(Collectors.toList());
        }



    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {

        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("Student not found by given Id: " + studentId)
        );
        student.setScNumber(updatedStudent.getScNumber());
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setPassword(updatedStudent.getPassword());
        student.setGpa(updatedStudent.getGpa());
        student.setDepartment(updatedStudent.getDepartment());
        student.setPosition(updatedStudent.getPosition());
        student.setCv(updatedStudent.getCv());
        student.setPhone(updatedStudent.getPhone());

        Student updatedStudentObj = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                ()->new ResourceNotFoundException("Student not found by given Id: " + studentId)
        );
        studentRepository.deleteById(studentId);

    }
}
