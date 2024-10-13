package com.internbridge.internbridge_backend.dto;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InterviewDTO {

    private Long interviewId;

    private LocalDate startDate;

    @NotNull(message = "Start time is required")
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    private String status;
    private String description;
    private String meetingLink;

    private Long studentId;
    private Long coordinatorId;


}
