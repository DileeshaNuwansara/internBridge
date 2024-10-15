package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.AuthenticationResponse;

import com.internbridge.internbridge_backend.security.JwtUtil;
import com.internbridge.internbridge_backend.dto.AuthenticationRequest;

import com.internbridge.internbridge_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.web.bind.annotation.*;




@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/user")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        try {
            // Call the login function in UserService
            AuthenticationResponse response = userService.loginUser(request);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }
}