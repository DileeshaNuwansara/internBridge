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
    public ResponseEntity<List<InterviewDTO>> createInterview(@RequestBody InterviewDTO interviewDTO) {


        List<InterviewDTO> createdInterviews = interviewService.createInterview(interviewDTO);
        return ResponseEntity.ok(createdInterviews);
    }


    @PutMapping("/update/{interviewId}")
    @PreAuthorize("hasRole('ROLE_COMPANYHR')")
    public ResponseEntity<InterviewDTO> updateInterview(@PathVariable Long interviewId, @RequestBody InterviewDTO interviewDTO) {
        InterviewDTO updatedInterview = interviewService.updateInterview(interviewId, interviewDTO);
        return ResponseEntity.ok(updatedInterview);
    }

    @DeleteMapping("/delete/{interviewId}")
    @PreAuthorize("hasRole('ROLE_COMPANYHR')")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long interviewId) {
        interviewService.deleteInterview(interviewId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{interviewId}")
    @PreAuthorize("hasAnyRole('ROLE_COMPANYHR', 'ROLE_STUDENT')")
    public ResponseEntity<InterviewDTO> getInterviewById(@PathVariable Long interviewId) {
        InterviewDTO interview = interviewService.getInterviewById(interviewId);
        return ResponseEntity.ok(interview);
    }

    @GetMapping("/getInterviewById/{studentId}")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<List<InterviewDTO>> getInterviewsByStudentId(@PathVariable Long studentId) {
        List<InterviewDTO> interviews = interviewService.getInterviewsByStudentId(studentId);
        System.out.println("Retrieved interviews for studentId " + studentId + ": " + interviews.size());

        return ResponseEntity.ok(interviews);
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
}