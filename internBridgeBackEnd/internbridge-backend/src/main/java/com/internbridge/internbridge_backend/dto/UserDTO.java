package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserDTO {
    private Long userId;
    private String name;
    private String password;
    private String email;
    private String company;
    private String phone;
    private String role;
    private String status;
    private List<Long> internshipIds;
    private List<Long> applicationIds;
}
