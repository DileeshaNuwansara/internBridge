package com.internbridge.internbridge_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthenticationRequest {
    private String email;
    private String password;
//    private String token;
    private String message;
    private String role;


}
