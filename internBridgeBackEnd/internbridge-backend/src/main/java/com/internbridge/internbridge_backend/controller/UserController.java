package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.LoginDTO;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.response.LoginResponse;
import com.internbridge.internbridge_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    //create user login rest api
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        try {
            // Attempt to register the user
            UserDTO registeredUser = userService.registerUser(userDTO);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Handle case where the user already exists or any other validation issues
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            return new ResponseEntity<>("An error occurred during registration. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //user loging
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            // Call the userService to handle the login
            LoginResponse loginResponse = userService.loginUser(loginDTO);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred during login. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    }

