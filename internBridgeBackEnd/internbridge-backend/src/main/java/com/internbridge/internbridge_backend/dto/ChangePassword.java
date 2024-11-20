package com.internbridge.internbridge_backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ChangePassword {

    private String password;

    private String repeatPassword;

}
