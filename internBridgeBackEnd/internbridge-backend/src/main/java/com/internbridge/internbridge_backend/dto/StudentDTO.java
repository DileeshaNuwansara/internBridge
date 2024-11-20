package com.internbridge.internbridge_backend.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDTO {
    private Long userId;
    private String name;
    private String password;
    private String email;
    private String company;
    private String phone;
    private String role;
    private String status;
    private String scNumber;
    private Double gpa;
    private String position;
    private Long companyHrId;
    private List<Long> applicationIds;
}
