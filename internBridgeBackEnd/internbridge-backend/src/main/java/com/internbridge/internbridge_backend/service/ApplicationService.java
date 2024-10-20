package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ApplicationService {

    ApplicationDTO createApplication(Long studentId, Long internshipId, Long interviewId, Long practiceSessionId);
    List<ApplicationDTO> getApplicationsByStudent(Long studentId);
    List<ApplicationDTO> getApplicationsForInternship(Long internshipId);
    List<ApplicationDTO> getApplicationsForInterview(Long interviewId);
    List<ApplicationDTO> getApplicationsForPracticeSession(Long sessionId);
    void updateApplicationStatus(Long applicationId, ApplicationDTO applicationDTO);
    void deleteApplication(Long applicationId);

    public byte[] generateCv(Long studentId);
    ApplicationDTO uploadCv(Long studentId, MultipartFile file) throws IOException;
}

