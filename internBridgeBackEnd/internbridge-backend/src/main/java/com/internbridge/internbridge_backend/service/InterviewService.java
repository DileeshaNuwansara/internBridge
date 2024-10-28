package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface InterviewService {
    List<InterviewDTO> createInterview(InterviewDTO interviewDTO);
    InterviewDTO updateInterview(Long interviewId, InterviewDTO interviewDTO);
    void deleteInterview(Long interviewId);
    InterviewDTO getInterviewById(Long interviewId);
    List<InterviewDTO> getAllInterviews();
    List<InterviewDTO> getInterviewsByStudentId(Long studentId);
    List<InterviewDTO> getAllInterviewsByCompanyHR(Long companyHrId);
}
