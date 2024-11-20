package com.internbridge.internbridge_backend.dto;

import lombok.Data;

import java.util.Date;
@Data
public class ForgotPasswordDTO {
    private Long fpid;
    private Integer otp;
    private Date expirationTime;
    private Long userId;
}
