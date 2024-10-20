package com.internbridge.internbridge_backend.service.Implementations;


import com.internbridge.internbridge_backend.dto.PracticeSessionDTO;

import com.internbridge.internbridge_backend.entity.PracticeSession;
import com.internbridge.internbridge_backend.entity.User;

import com.internbridge.internbridge_backend.repository.PracticeSessionRepository;
import com.internbridge.internbridge_backend.service.PracticeSessionService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PracticeSessionServiceImpl implements PracticeSessionService {


    @Autowired
    private PracticeSessionRepository practiceSessionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PracticeSessionDTO createPracticeSession(PracticeSessionDTO practiceSessionDTO, User user) {

        if (!user.getRole().equals("companyHR")) {
            throw new RuntimeException("Unauthorized: Only company HR can create practice sessions");
        }

        PracticeSession practiceSession = modelMapper.map(practiceSessionDTO, PracticeSession.class);
        PracticeSession savedSession = practiceSessionRepository.save(practiceSession);
        return modelMapper.map(savedSession, PracticeSessionDTO.class);
    }

    @Override
    public PracticeSessionDTO updatePracticeSession(Long sessionId, PracticeSessionDTO practiceSessionDTO, User user) {
        // Only allow users with the "companyHR" role to update a practice session
        if (!user.getRole().equals("companyHR")) {
            throw new RuntimeException("Unauthorized: Only company HR can update practice sessions");
        }

        PracticeSession practiceSession = practiceSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Practice Session not found"));

        practiceSession.setTitle(practiceSessionDTO.getTitle());
        practiceSession.setDescription(practiceSessionDTO.getDescription());
        practiceSession.setStartDate(practiceSessionDTO.getStartDate());
        practiceSession.setStartTime(practiceSessionDTO.getStartTime());
        practiceSession.setStatus(practiceSessionDTO.getStatus());
        practiceSession.setMeetingLink(practiceSessionDTO.getMeetingLink());

        PracticeSession updatedSession = practiceSessionRepository.save(practiceSession);
        return modelMapper.map(updatedSession, PracticeSessionDTO.class);
    }

    @Override
    public void deletePracticeSession(Long sessionId, User user) {

        if (!user.getRole().equals("companyHR")) {
            throw new RuntimeException("Unauthorized: Only company HR can delete practice sessions");
        }

        PracticeSession practiceSession = practiceSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Practice Session not found"));
        practiceSessionRepository.delete(practiceSession);
    }

    @Override
    public List<PracticeSessionDTO> getAllPracticeSessions(User user) {
        // Students and coordinators can only view practice sessions
        if (user.getRole().equals("student") || user.getRole().equals("coordinator")) {
            return practiceSessionRepository.findAll().stream()
                    .map(session -> modelMapper.map(session, PracticeSessionDTO.class))
                    .collect(Collectors.toList());
        }


        throw new RuntimeException("Unauthorized: You do not have permission to view practice sessions");
    }

    @Override
    public PracticeSessionDTO getPracticeSessionById(Long sessionId, User user) {

        if (user.getRole().equals("student") || user.getRole().equals("coordinator")) {
            PracticeSession practiceSession = practiceSessionRepository.findById(sessionId)
                    .orElseThrow(() -> new RuntimeException("Practice Session not found"));
            return modelMapper.map(practiceSession, PracticeSessionDTO.class);
        }


        throw new RuntimeException("Unauthorized: You do not have permission to view this practice session");
    }
}