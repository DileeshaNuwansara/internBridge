package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.MailBody;

public interface MailService {
    void sendSimpleMessage(MailBody mailBody);
}
