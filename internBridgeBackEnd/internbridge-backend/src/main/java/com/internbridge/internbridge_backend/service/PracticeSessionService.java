package com.internbridge.internbridge_backend.service;

import com.internbridge.internbridge_backend.dto.PracticeSessionDTO;
import com.internbridge.internbridge_backend.entity.User;

import java.util.List;

public interface PracticeSessionService {

    PracticeSessionDTO createPracticeSession(PracticeSessionDTO practiceSessionDTO, Long userId);


    PracticeSessionDTO updatePracticeSession(Long practiceSessionId, PracticeSessionDTO practiceSessionDTO, Long userId);





    void deletePracticeSession(Long sessionId, User user);

    List<PracticeSessionDTO> getAllPracticeSessions(User user);

    PracticeSessionDTO getPracticeSessionById(Long sessionId, User user);

    List<PracticeSessionDTO> getPracticeSessionsByHrId(Long hrId);

}
