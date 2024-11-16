package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class InterviewDTO {

    private Long interviewId;
    private LocalDate startDate;
    private LocalTime startTime;
    private String status;
    private String description;
    private String meetingLink;
    private Long companyHRId;
    private List<Long> studentIds;
    private List<StudentDTO> assignedStudents;

}
