package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface InterviewService {

    InterviewDTO createInterview(InterviewDTO interviewDTO);

    InterviewDTO updateInterview(Long interviewId, InterviewDTO interviewDTO);
    void deleteInterview(Long interviewId);

    void addStudentsToInterview(Long interviewId, List<Long> studentIds);

    List<InterviewDTO> getInterviewsWithAssignedStudents(Long internshipId);

    InterviewDTO getInterviewById(Long interviewId);

    List<InterviewDTO> getAllInterviews();

    List<InterviewDTO> getInterviewsByStudentId(Long studentId);

    List<InterviewDTO> getAllInterviewsByCompanyHR(Long companyHrId);
}
