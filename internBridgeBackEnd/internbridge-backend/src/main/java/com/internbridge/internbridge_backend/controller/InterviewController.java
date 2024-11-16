package com.internbridge.internbridge_backend.controller;


import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping("/create")
    public ResponseEntity<InterviewDTO> createInterview(@RequestBody InterviewDTO interviewDTO) {
        try {
            InterviewDTO createdInterview = interviewService.createInterview(interviewDTO);
            return ResponseEntity.ok(createdInterview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //@PreAuthorize("hasRole('ROLE_COMPANYHR')")

    @PutMapping("/update/{interviewId}")
    public ResponseEntity<InterviewDTO> updateInterview(@PathVariable Long interviewId, @RequestBody InterviewDTO interviewDTO) {
        System.out.println("Received interviewId: " + interviewId);
        System.out.println("Received interviewDTO: " + interviewDTO);
        try {
            InterviewDTO updatedInterview = interviewService.updateInterview(interviewId, interviewDTO);
            return ResponseEntity.ok(updatedInterview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //@PreAuthorize("hasRole('ROLE_COMPANYHR')")
    @DeleteMapping("/delete/{interviewId}")
    public ResponseEntity<String> deleteInterview(@PathVariable Long interviewId) {

        try{
            interviewService.deleteInterview(interviewId);
            return ResponseEntity.ok("Interview deleted successfully");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Failed to delete interview");
        }
    }

    @GetMapping("/{interviewId}")
    //@PreAuthorize("hasAnyRole('ROLE_COMPANYHR', 'ROLE_STUDENT')")
    public ResponseEntity<InterviewDTO> getInterviewById(@PathVariable Long interviewId) {
        InterviewDTO interview = interviewService.getInterviewById(interviewId);
        return ResponseEntity.ok(interview);
    }

    @GetMapping("/getInterviewById/{studentId}")
    //@PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<List<InterviewDTO>> getInterviewsByStudentId(@PathVariable Long studentId) {
        List<InterviewDTO> interviews = interviewService.getInterviewsByStudentId(studentId);
        System.out.println("Retrieved interviews for studentId " + studentId + ": " + interviews.size());

        return ResponseEntity.ok(interviews);
    }

    @PostMapping("/{id}/addStudents")
    public ResponseEntity<String> addStudentsToInterview(@PathVariable Long id, @RequestBody List<Long> studentIds) {
        try {
            interviewService.addStudentsToInterview(id, studentIds);
            return ResponseEntity.ok("Students added to interview successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add students to interview");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<InterviewDTO>> getAllInterviews() {
        List<InterviewDTO> interviews = interviewService.getAllInterviews();
        return new ResponseEntity<>(interviews, HttpStatus.OK);
    }

    @GetMapping("/byCompanyHR/{companyHrId}")
    //@PreAuthorize("hasRole('ROLE_COMPANYHR')")
    public ResponseEntity<List<InterviewDTO>> getAllInterviewsByCompanyHR(@PathVariable Long companyHrId) {
        List<InterviewDTO> interviews = interviewService.getAllInterviewsByCompanyHR(companyHrId);
        return ResponseEntity.ok(interviews);

    }

    @GetMapping("/byInternship/{internshipId}")
    public List<InterviewDTO> getInterviewsByInternshipId(@PathVariable Long internshipId) {
        return interviewService.getInterviewsWithAssignedStudents(internshipId);
    }

}