package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.MailBody;
import com.internbridge.internbridge_backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;


    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendSimpleMessage(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom("sayhellointernbridge@gmail.com");
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());


        System.out.println("Sending email to: " + mailBody.to());

        try {
            mailSender.send(message);
            System.out.println("Email sent successfully to {}"+ mailBody.to());
        } catch (Exception e) {
            System.out.println("Failed to send email to {}"+ mailBody.to());
        }
    }


}
