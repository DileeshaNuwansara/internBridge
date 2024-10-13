package com.internbridge.internbridge_backend.controller;


import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
public class ApplicationController {


    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/create")
    public ResponseEntity<ApplicationDTO> createApplication(@RequestParam Long studentId,
                                                            @RequestParam(required = false) Long internshipId,
                                                            @RequestParam(required = false) Long interviewId,
                                                            @RequestParam(required = false) Long practiceSessionId) {
        ApplicationDTO applicationDTO = applicationService.createApplication(studentId, internshipId, interviewId, practiceSessionId);
        return new ResponseEntity<>(applicationDTO, HttpStatus.CREATED);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStudent(@PathVariable Long studentId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByStudent(studentId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForInternship(@PathVariable Long internshipId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsForInternship(internshipId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForInterview(@PathVariable Long interviewId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsForInterview(interviewId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/practice-session/{sessionId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForPracticeSession(@PathVariable Long sessionId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsForPracticeSession(sessionId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Void> updateApplicationStatus(@PathVariable Long applicationId, @RequestBody ApplicationDTO applicationDTO) {
        applicationService.updateApplicationStatus(applicationId, applicationDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}