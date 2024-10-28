package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.dto.InternshipDTO;
import com.internbridge.internbridge_backend.service.ApplicationService;
import com.internbridge.internbridge_backend.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/internships")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/create/{companyHrId}")
    public ResponseEntity<InternshipDTO> createInternship(@RequestBody InternshipDTO internshipDTO,
                                                          @PathVariable Long companyHrId) {
        InternshipDTO createdInternship = internshipService.createInternship(internshipDTO, companyHrId);
        return ResponseEntity.ok(createdInternship);
    }

    @GetMapping("/{internshipId}")
    public ResponseEntity<InternshipDTO> getInternshipById(@PathVariable Long internshipId) {
        InternshipDTO internship = internshipService.getInternshipById(internshipId);
        return ResponseEntity.ok(internship);
    }

    @GetMapping("/all")
    public ResponseEntity<List<InternshipDTO>> getAllInternships() {
        List<InternshipDTO> internships = internshipService.getAllInternships();
        return ResponseEntity.ok(internships);
    }

    @GetMapping("/companyHr/{companyHrId}")
    public ResponseEntity<List<InternshipDTO>> getInternshipsByCompanyHr(@PathVariable Long companyHrId) {
        List<InternshipDTO> internships = internshipService.getInternshipsByCompanyHr(companyHrId);
        return ResponseEntity.ok(internships);
    }

    @PutMapping("/update/{internshipId}")
    public ResponseEntity<InternshipDTO> updateInternship(@PathVariable Long internshipId,
                                                          @RequestBody InternshipDTO internshipDTO) {
        InternshipDTO updatedInternship = internshipService.updateInternship(internshipId, internshipDTO);
        return ResponseEntity.ok(updatedInternship);
    }

    @DeleteMapping("/delete/{internshipId}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long internshipId) {
        internshipService.deleteInternship(internshipId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationDTO>> getAppliedStudentsByInternship(@PathVariable Long internshipId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByInternshipId(internshipId);
        return ResponseEntity.ok(applications);
    }
}