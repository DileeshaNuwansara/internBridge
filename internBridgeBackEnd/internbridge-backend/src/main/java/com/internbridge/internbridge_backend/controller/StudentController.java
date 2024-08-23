package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.StudentDto;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.mapper.StudentMapper;
import com.internbridge.internbridge_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    //Create Student REST API
    @PostMapping("/create")
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //Build get Student by Id REST API
    @GetMapping("/getone/{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId) {
        StudentDto studentDto = studentService.getStudentById(studentId);
        return ResponseEntity.ok(studentDto);
    }

    //Build getAll student REST API
    @GetMapping("/getAll")
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }



    @PutMapping("/update{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId,
                                                    @RequestBody StudentDto updatedstudent) {
        StudentDto studentDto = studentService.updateStudent(studentId, updatedstudent);
        return ResponseEntity.ok(studentDto);
    }

    //Build delete student REST Api
    @DeleteMapping("/delete{Id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok( "Student deleted successfully");
    }











}
