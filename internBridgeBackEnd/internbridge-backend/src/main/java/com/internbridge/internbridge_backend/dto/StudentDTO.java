package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO extends UserDTO {



    private String scNumber;
    private String gpa;
    private String position;
    private byte[] cv;

    public StudentDTO(long userId, String name, String email, String phone, String role, String scNumber, Double gpa, String position, byte[] cv) {
    }


    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }

    }
}
