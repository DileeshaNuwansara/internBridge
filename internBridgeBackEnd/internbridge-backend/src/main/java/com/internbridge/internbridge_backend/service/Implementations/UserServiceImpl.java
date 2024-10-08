package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.LoginDTO;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.response.LoginResponse;
import com.internbridge.internbridge_backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;




@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;






    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        // Find user by email, and check if it already exists
        User existingUser = userRepository.findByEmail(userDTO.getEmail());

        if (existingUser != null) {
            // Throw an exception if the user already exists
            throw new IllegalArgumentException("User with email " + userDTO.getEmail() + " already exists.");
        }

        try {
            // Map UserDTO to User entity and save it
            User user = modelMapper.map(userDTO, User.class);
            userRepository.save(user);
            return userDTO;

        } catch (DataIntegrityViolationException e) {
            // Handle unique constraint violation error
            throw new IllegalArgumentException("Could not register user. Duplicate entry detected: " + e.getMessage());
        }
    }

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        // Retrieve the user based on the email
        User user = userRepository.findByEmail(loginDTO.getEmail());

        // Check if user exists
        if (user != null) {
            // Compare passwords (assuming plain text comparison)
            if (user.getPassword().equals(loginDTO.getPassword())) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else {
            return new LoginResponse("Email not exists", false);
        }
    }
}
