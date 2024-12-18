package com.internbridge.internbridge_backend.dto;

import com.internbridge.internbridge_backend.entity.Application;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApplicationDTO {
    private Long applicationId;
    private Long studentId;
    private Long internshipId;
    private Long interviewerId;
    private String applicationStatus;
    private LocalDate appliedDate;
    private Long userId;
    private byte[] cv;
}
