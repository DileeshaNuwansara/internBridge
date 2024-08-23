package com.internbridge.internbridge_backend.mapper;

import com.internbridge.internbridge_backend.dto.StudentDto;
import com.internbridge.internbridge_backend.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getScNumber(),
                student.getName(),
                student.getEmail(),
                student.getPassword(),
                student.getGpa(),
                student.getDepartment(),
                student.getPosition(),
                student.getCv(),
                student.getPhone(updatedStudent.getPhone())
        );

    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
        student.setScNumber(studentDto.getScNumber());
        student.setName(studentDto.getName());
        student.setEmail(studentDto.getEmail());
        student.setPassword(studentDto.getPassword());
        student.setGpa(studentDto.getGpa());
        student.setDepartment(studentDto.getDepartment());
        student.setPosition(studentDto.getPosition());
        student.setCv(studentDto.getCv());
        student.setPhone(studentDto.getPhone());
        return student;
    }

}
