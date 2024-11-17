package com.internbridge.internbridge_backend.dto;

import lombok.Data;

@Data
public class InterviewParticipationDTO {
    private Long interviewParticipationId;
    private Long studentId;
    private Long interviewId;
    private Long interviewStatus;

}
