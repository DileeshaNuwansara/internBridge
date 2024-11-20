package com.internbridge.internbridge_backend.controller;

import com.internbridge.internbridge_backend.dto.ForgotPasswordDTO;
import com.internbridge.internbridge_backend.dto.MailBody;
import com.internbridge.internbridge_backend.entity.ForgotPassword;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.ForgotPasswordRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.MailService;
import com.internbridge.internbridge_backend.util.ChangePassword;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
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

    @Autowired
    private ModelMapper modelMapper;

    public ForgotPasswordController(UserRepository userRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<ForgotPasswordDTO> verifyMail(@PathVariable String email) {
        try {
            User user = userRepository.findByEmail(email);


            if (user == null) {
                throw new ResourceNotFoundException("Please provide a valid Email");
            }




        int otp = otpGenerator();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 3000))
                .user(user)
                .build();

        mailService.sendSimpleMessage(
                MailBody.builder()
                        .to(email)
                        .text("Dear User,\n\n \n " +
                                "We received a request to reset your password. Please use the following otp for  your password. \n" +
                                "This is the OTP for your forgot password request :  " + otp +  "\n\n" + "If you did not request this, please ignore this email.\n\n" +
                                "Best regards,\n" +
                                "InternBridge Team"

                        )
                        .subject("OTP for forgot password request")
                        .build()
        );

        ForgotPassword savedFp = forgotPasswordRepository.save(fp);

        ForgotPasswordDTO forgotPasswordDTO = modelMapper.map(savedFp, ForgotPasswordDTO.class);


        return ResponseEntity.status(HttpStatus.CREATED).body(forgotPasswordDTO);

        } catch(Exception e)

            {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null);
            }
}


    @PostMapping("/verifyotp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("Please provide a valid email");
        }


        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new ResourceNotFoundException("Please provide a valid OTP"));

        System.out.println("OTP: " + otp + ", Email: " + email);


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

        System.out.println("Request body: {}"+changePassword);

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
