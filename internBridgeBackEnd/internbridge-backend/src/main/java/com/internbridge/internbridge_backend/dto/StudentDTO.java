package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO extends UserDTO {


    private Long userId;
    private String name;
    private String password;
    private String email;
    private String company;
    private String phone;
    private String role;
    private String status;
    private String scNumber;
    private String gpa;
    private String position;
    //private byte[] cv;

    public StudentDTO(long userId, String name, String email, String phone, String role, String scNumber, Double gpa, String position) {
    }


    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }

    }
}
