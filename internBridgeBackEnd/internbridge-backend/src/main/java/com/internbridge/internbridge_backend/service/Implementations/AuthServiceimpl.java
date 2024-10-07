package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.LoginRequestDTO;
import com.internbridge.internbridge_backend.dto.LoginResponseDTO;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.repository.LoginRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private LoginRegisterRepository loginRegisterRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

//    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
//        User user = LoginRegisterRepository.findByEmail(loginRequestDTO.getEmail())
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//    }

    public  LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        User user = loginRegisterRepository.findByEmail(loginRequestDTO.getEmail());
        if(user != null) {
            String password = loginRequestDTO.getPassword();
            String encodedpassword  = user.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedpassword);

            if (isPwdRight) {
                return new LoginResponseDTO("Login Succes",true);
            }

        }
    }
}

