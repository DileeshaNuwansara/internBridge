package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.MailBody;
import com.internbridge.internbridge_backend.entity.ForgotPassword;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.ForgotPasswordRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.MailService;
import com.internbridge.internbridge_backend.util.ChangePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@Controller
@RequestMapping("/api/v1/forgotPwd")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UserRepository userRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyMail(@PathVariable String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new ResourceNotFoundException("Please provide a valid Email");
        }

        int otp = otpGenerator();

        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your forgot Password request: " + otp)
                .subject("OTP for forgot password request")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 3000))
                .user(user)
                .build();

        mailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok("Email sent for verification");
    }

    @PostMapping("/verifyotp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("Please provide a valid email");
        }


        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new ResourceNotFoundException("Please provide a valid OTP"));

        // Check if OTP has expired
        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return ResponseEntity.ok("OTP has expired");
        }

        return ResponseEntity.ok("OTP has been verified");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Passwords do not match, Please enter the password again.");
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed");
    }

    private Integer otpGenerator() {
        Random rand = new Random();
        return 100000 + rand.nextInt(900000);
    }
}
