package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginRegisterDTO {
    private String name;
    private String password;
    private String email;
    private String company;
    private String phone;
    private String role;
    private String status;
}
