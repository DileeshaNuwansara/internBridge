package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.AuthenticationRequest;
import com.internbridge.internbridge_backend.dto.AuthenticationResponse;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.response.LoginResponse;

import java.util.List;

public interface UserService {

    UserDTO registerUser(UserDTO userDTO);
    AuthenticationResponse loginUser(AuthenticationRequest loginRequest);
    UserDTO getuserByID(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id,UserDTO userDTO);
    void deleteUser(Long id);

}
