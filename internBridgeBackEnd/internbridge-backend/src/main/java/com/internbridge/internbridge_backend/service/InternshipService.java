package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.dto.InternshipDTO;

import java.util.List;

public interface InternshipService {

    InternshipDTO createInternship(InternshipDTO internshipDTO, Long companyHrId);

    InternshipDTO getInternshipById(Long internshipId);

    List<InternshipDTO> getAllInternships();

    List<InternshipDTO> getInternshipsByCompanyHr(Long companyHrId);

    InternshipDTO updateInternship(Long internshipId, InternshipDTO internshipDTO);

    void deleteInternship(Long internshipId);

    List<ApplicationDTO> getApplicationsByInternshipId(Long internshipId);
}
