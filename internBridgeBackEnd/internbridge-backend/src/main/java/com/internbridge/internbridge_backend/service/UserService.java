package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.LoginDTO;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.response.LoginResponse;

public interface UserService {

    UserDTO registerUser(UserDTO userDTO);
    LoginResponse loginUser(LoginDTO loginDTO);
}
