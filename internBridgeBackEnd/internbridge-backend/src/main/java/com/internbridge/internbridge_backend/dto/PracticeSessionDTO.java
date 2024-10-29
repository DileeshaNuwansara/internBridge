package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class PracticeSessionDTO {
    private Long practiceSessionId;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalTime startTime;
    private String status;
    private String meetingLink;
//    private List<Long> applicationIds;
}
