package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String company;
    private Integer availablePositions;
    private String status;
}





