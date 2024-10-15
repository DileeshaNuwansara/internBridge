package com.internbridge.internbridge_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private Long userId;
    private String role;
    private String email;
    private String message;
    private Boolean status;
}
