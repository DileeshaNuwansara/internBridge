package com.internbridge.internbridge_backend.controller;


import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.dto.InternshipDTO;
import com.internbridge.internbridge_backend.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("api/v1/application")
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

    @PostMapping("/apply")
    public ApplicationDTO applyToInternship(@RequestParam Long studentId, @RequestParam Long internshipId) {
        return applicationService.applyToInternship(studentId, internshipId);
    }

    @GetMapping("/student/{studentId}/internships")
    public List<InternshipDTO> getInternshipsByStudent(@PathVariable Long studentId) {
        return applicationService.getInternshipsByStudent(studentId);
    }

//    @GetMapping("/internship/{internshipId}")
//    public ResponseEntity<List<ApplicationDTO>> getApplicationsForInternship(@PathVariable Long internshipId) {
//        List<ApplicationDTO> applications = applicationService.getApplicationsForInternship(internshipId);
//        return new ResponseEntity<>(applications, HttpStatus.OK);
//    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByInternshipId(@PathVariable Long internshipId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByInternshipId(internshipId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForInterview(@PathVariable Long interviewId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsForInterview(interviewId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

//    @GetMapping("/practice-session/{sessionId}")
//    public ResponseEntity<List<ApplicationDTO>> getApplicationsForPracticeSession(@PathVariable Long sessionId) {
//        List<ApplicationDTO> applications = applicationService.getApplicationsForPracticeSession(sessionId);
//        return new ResponseEntity<>(applications, HttpStatus.OK);
//    }

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

    @PostMapping("cv/upload")
    public ResponseEntity<String> uploadCv(@RequestParam("studentId") Long studentId,
                                           @RequestParam("file") MultipartFile file) {
        try {
            applicationService.uploadCv(studentId, file);
            return ResponseEntity.ok("CV uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading CV.");
        }
    }

    @GetMapping("cv/generate")
    public ResponseEntity<byte[]> generateCv(@RequestParam("studentId") Long studentId) {
        byte[] generatedCv = applicationService.generateCv(studentId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"cv.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(generatedCv);
    }

    @GetMapping("/cv/download")
    public ResponseEntity<List<byte[]>> downloadCv(@RequestParam("studentId") Long studentId) {
        List<byte[]> cvs = applicationService.getCvByStudentId(studentId);

        if (cvs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cvs);

    }
}