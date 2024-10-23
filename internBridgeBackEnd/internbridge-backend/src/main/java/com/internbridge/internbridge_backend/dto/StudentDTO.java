package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class StudentDTO extends UserDTO {


    private Long userId;
//    private String name;
//    private String password;
//    private String email;
//    private String company;
//    private String phone;
//    private String role;
//    private String status;
    private String scNumber;
    private String gpa;
    private String position;

    //private byte[] cv;

    public StudentDTO(long userId, String password, String name, String email, String company, String phone, String role, String status, String scNumber, Double gpa, String position) {
        super(name, password, email, company, phone, role, status);
        this.userId = userId;
        this.scNumber = scNumber;
        this.gpa = String.valueOf(gpa);
        this.position = position != null ? position : "Software Engineer";
    }


    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }
    }
}
