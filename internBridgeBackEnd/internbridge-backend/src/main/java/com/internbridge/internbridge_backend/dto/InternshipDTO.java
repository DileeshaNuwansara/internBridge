package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class InternshipDTO {
    private Long internshipId;
    private String title;
    private String description;
    private String requirements;
    private String position;
    private LocalDate startDate;
    private int availablePositions;
    private String company;
    private byte[] imageData;
    private Long userId;
}
