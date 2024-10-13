package com.internbridge.internbridge_backend.dto;

import lombok.*;

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
    private String status;
    private Date appliedDate;

}
