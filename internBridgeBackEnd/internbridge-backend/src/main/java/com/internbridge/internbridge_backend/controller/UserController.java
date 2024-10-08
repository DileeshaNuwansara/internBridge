package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.LoginRegisterDTO;
import com.internbridge.internbridge_backend.dto.LoginRequestDTO;
import com.internbridge.internbridge_backend.dto.LoginResponseDTO;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class LoginController {
    @Autowired
    private AuthService authService;

    //cerate user login rest api
    // @PostMapping("/register")
    public ResponseEntity<User> register (@RequestBody LoginRegisterDTO loginRegisterDTO){
        User user = authService.registerUser(loginRegisterDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public LoginResponseDTO login (LoginRequestDTO loginRequestDTO){
        System.out.println(loginRequestDTO);
        LoginResponseDTO loginResponseDTO = authService.login(loginRequestDTO);
                return loginResponseDTO;
    }


    }
}
