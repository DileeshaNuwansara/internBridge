package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/profile")
    public StudentDTO getStudentProfile(@RequestParam String email) {
        return studentService.getStudentProfile(email);
    }

    @PutMapping("/profile")
    public StudentDTO updateStudentProfile(@RequestParam String email, @RequestBody StudentDTO studentDTO) {
        return studentService.updateStudentProfile(email, studentDTO);
    }
}
