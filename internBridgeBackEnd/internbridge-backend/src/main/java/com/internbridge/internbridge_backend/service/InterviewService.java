package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import org.apache.coyote.BadRequestException;

import java.util.List;
import java.util.stream.Collectors;

public interface InterviewService {
    InterviewDTO createInterview(InterviewDTO interviewDTO);
    InterviewDTO updateInterview(Long interviewId, InterviewDTO interviewDTO);
    void deleteInterview(Long interviewId);
    InterviewDTO getInterviewById(Long interviewId);
    List<InterviewDTO> getAllInterviews();
    List<InterviewDTO> getInterviewsByStudentId(Long studentId);
}
