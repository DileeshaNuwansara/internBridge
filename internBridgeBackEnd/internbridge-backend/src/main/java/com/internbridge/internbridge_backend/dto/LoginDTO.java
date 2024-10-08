package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDTO {

    private String email;
    private String password;
}
