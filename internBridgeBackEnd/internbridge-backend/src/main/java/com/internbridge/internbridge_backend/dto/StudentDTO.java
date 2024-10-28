package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class StudentDTO {
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String company;
    private String phone;
    private String scNumber;
    private Double gpa;
    private String position;
    private Long companyHrId;
    private List<Long> applicationIds;
}
