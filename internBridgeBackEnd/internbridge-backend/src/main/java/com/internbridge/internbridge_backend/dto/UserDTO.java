package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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


    public UserDTO(String name, String password, String email, String company, String phone, String role, String status) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.company = company;
        this.phone = phone;
        this.role = role;
        this.status = status;
    }
}
