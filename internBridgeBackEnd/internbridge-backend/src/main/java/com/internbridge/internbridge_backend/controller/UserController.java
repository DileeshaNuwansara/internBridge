package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.MailBody;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.service.MailService;
import com.internbridge.internbridge_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;



    //create user register rest api
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        try {
            // Attempt to register the user
            UserDTO registeredUser = userService.registerUser(userDTO);

            //email sending to welcome the user

            String defaultPassword = "12345678";
            String subject = "Welcome to InternBridge!";
            String text = String.format(
                    "Dear  %s,\n\n" +
                            "Welcome to InternBridge! \n \n \n We’re excited to have you on board.\n\n" +
                            "Here’s your username: %s\n" +
                            "Your default password: %s\n\n" +
                            "Please change your password to something more secure after logging in.\n\n" +
                            "Best regards,\nInternBridge Team",
                    registeredUser.getName(), registeredUser.getName(), defaultPassword
            );

            MailBody mailBody = MailBody.builder()
                    .to(registeredUser.getEmail())
                    .subject(subject)
                    .text(text)
                    .build();
            mailService.sendSimpleMessage(mailBody);

            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Handle case where the user already exists or any other validation issues
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            return new ResponseEntity<>("An error occurred during registration. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        try {
            UserDTO user = userService.getuserByID(userId);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the user data.");
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);

    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable String userId, @RequestBody UserDTO userDto) {
        try {
            UserDTO updatedUser = userService.updateUser(Long.valueOf(userId), userDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all Admins
    @GetMapping("/getAdmins")
    public ResponseEntity<List<UserDTO>> getAdmins() {
        List<UserDTO> admins = userService.getUsersByRole("ROLE_ADMIN");
        return ResponseEntity.ok(admins);
    }

    // Get all Students
    @GetMapping("/getStudents")
    public ResponseEntity<List<UserDTO>> getStudents() {
        List<UserDTO> students = userService.getUsersByRole("ROLE_STUDENT");
        return ResponseEntity.ok(students);
    }

    // Get all Coordinators
    @GetMapping("/getCoordinators")
    public ResponseEntity<List<UserDTO>> getCoordinators() {
        List<UserDTO> coordinators = userService.getUsersByRole("ROLE_COORDINATOR");
        return ResponseEntity.ok(coordinators);
    }

    // Get all Company HRs
    @GetMapping("/getCompanyHRs")
    public ResponseEntity<List<UserDTO>> getCompanyHRs() {
        List<UserDTO> hrUsers = userService.getUsersByRole("ROLE_COMPANYHR");
        return ResponseEntity.ok(hrUsers);
    }






    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }


    }

