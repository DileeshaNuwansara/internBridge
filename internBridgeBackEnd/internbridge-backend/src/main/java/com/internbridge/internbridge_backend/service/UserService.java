package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.AuthenticationRequest;
import com.internbridge.internbridge_backend.dto.AuthenticationResponse;
import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {

    UserDTO registerUser(UserDTO userDTO);
    AuthenticationResponse loginUser(AuthenticationRequest loginRequest);
    UserDTO getuserByID(String userid);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long userid,UserDTO userDTO);
    void deleteUser(Long userid);
    StudentDTO createStudent(StudentDTO studentDTO);
    List<StudentDTO> getAllStudents();
    void updateUserPassword(String email, String newPassword);
    List<UserDTO> getNotHiredStudents();

    List<UserDTO> getUsersByRole(String role);

    //ResponseEntity<Object> createAuthenticationToken(AuthenticationRequest authenticationRequest) throws Exception;

}
