package com.internbridge.internbridge_backend.dto;

import java.util.Date;

public class ForgotPasswordDTO {
    private Long fpid;
    private Integer otp;
    private Date expirationTime;
    private Long userId;
}
