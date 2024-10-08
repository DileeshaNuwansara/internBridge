package com.internbridge.internbridge_backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class PracticeSessionDTO {
    private Long sessionId;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalTime startTime;
    private String status;
    private String meetingLink;
}
