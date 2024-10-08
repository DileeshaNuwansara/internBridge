package com.internbridge.internbridge_backend.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponse {
    String message;
    Boolean status;
}
