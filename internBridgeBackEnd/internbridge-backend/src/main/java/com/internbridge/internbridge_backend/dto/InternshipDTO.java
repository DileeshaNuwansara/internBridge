package com.internbridge.internbridge_backend.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    //private String roleCompanyHrId;
    //private List<Long> applicationIds;

}
