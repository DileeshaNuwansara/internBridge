package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.AuthenticationRequest;
import com.internbridge.internbridge_backend.dto.AuthenticationResponse;
import com.internbridge.internbridge_backend.dto.UserDTO;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.response.LoginResponse;
import com.internbridge.internbridge_backend.security.JwtUtil;
import com.internbridge.internbridge_backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;




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
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            User user = modelMapper.map(userDTO, User.class);
            userRepository.save(user);
            return userDTO;

        } catch (DataIntegrityViolationException e) {
            // Handle unique constraint violation error
            throw new IllegalArgumentException("Could not register user. Duplicate entry detected: " + e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse loginUser(AuthenticationRequest request) {
        // Retrieve the user by email
        User user = userRepository.findByEmail(request.getEmail());

        // Check if user exists and password matches
        if (user != null) {
            String password1 = request.getPassword();
            String password2 = passwordEncoder.encode(request.getPassword());
            Boolean ispwd = passwordEncoder.matches(password1, password2);
            if(ispwd){
                // Convert User entity to UserDetails
                CustomUserDetails userDetails = new CustomUserDetails(user);

                // Generate JWT Token using UserDetails
                String token = jwtUtil.generateToken(userDetails);
                // Return the response with token, role, and a success message
//                String token="aaa";
                return new AuthenticationResponse(token, user.getRole(), "Login successful",true);
            }else {
                return new AuthenticationResponse(null, null, "Login failed",false);
            }



        } else {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

//    @Override
//    public LoginResponse loginUser(LoginDTO loginDTO) {
//        // Retrieve the user based on the email
//        User user = userRepository.findByEmail(loginDTO.getEmail());
//
//        // Check if user exists
//        if (user != null) {
//            // Compare passwords (assuming plain text comparison)
//            if (user.getPassword().equals(loginDTO.getPassword())) {
//                return new LoginResponse("Login Success", true);
//            } else {
//                return new LoginResponse("Password Not Match", false);
//            }
//        } else {
//            return new LoginResponse("Email not exists", false);
//        }
//    }

    @Override
    public UserDTO getuserByID(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id)
        );
        return modelMapper.map(user, UserDTO.class);

    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id,UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id)
        );
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setCompany(userDTO.getCompany());
        user.setPhone(userDTO.getPhone());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole());
        user.setStatus(userDTO.getStatus());
        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id)
        );
        userRepository.delete(user);
    }


}
