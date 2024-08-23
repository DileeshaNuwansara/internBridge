package com.internbridge.internbridge_backend.service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncryptionService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public PasswordEncryptionService() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public String encryptPassword(String plainPassword) {
        return bCryptPasswordEncoder.encode(plainPassword);
    }

    public boolean checkPassword(String plainPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(plainPassword, encodedPassword);
    }

}
