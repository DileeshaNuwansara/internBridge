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

    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }

    }
}
