package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.internbridge.internbridge_backend.entity.Role.ROLE_STUDENT;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("api/v1/student/")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        try {
            StudentDTO createdStudent = studentService.createStudent(studentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
        } catch (Exception ex) {
            // Log the exception
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/details/{userId}")
    public ResponseEntity<StudentDTO> getStudentProfileByUserId(@PathVariable Long userId) {
        try {
            System.out.println("Fetching profile for userId: " + userId);
            StudentDTO studentDTO = studentService.getStudentProfileByUserId(userId);
            return ResponseEntity.ok(studentDTO);
        } catch (ResourceNotFoundException ex) {
            System.out.println("Student not found with id ");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    @PutMapping("/update/{userId}")
    public ResponseEntity<StudentDTO> updateStudentProfileByUserId(@PathVariable Long userId, @RequestBody StudentDTO studentDTO) {
        try {
            StudentDTO updatedStudentDTO = studentService.updateStudentProfileByUserId(userId, studentDTO);
            return ResponseEntity.ok(updatedStudentDTO);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/companyHr/{companyHrId}")
    public ResponseEntity<List<StudentDTO>> getStudentsByCompanyHr(@PathVariable Long companyHrId) {
        List<StudentDTO> students = studentService.getStudentsByCompanyHr(companyHrId);
        return ResponseEntity.ok(students);
    }

    @DeleteMapping("/remove/{userId}")
    public ResponseEntity<Void> deleteStudentByUserId(@PathVariable Long userId) {
        try {
            studentService.deleteStudentByUserId(userId);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/students/filter")
    public ResponseEntity<List<StudentDTO>> getFilteredStudents(@RequestParam(required = false) String email,
                                                                @RequestParam(required = false) String status) {
        List<StudentDTO> students = studentService.getFilteredStudents(email,status);
        return ResponseEntity.ok(students);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentDTO> studentDTOs = studentService.getAllStudents();
        return ResponseEntity.ok(studentDTOs);
    }
}