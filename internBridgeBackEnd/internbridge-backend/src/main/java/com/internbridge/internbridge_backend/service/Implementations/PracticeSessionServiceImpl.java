package com.internbridge.internbridge_backend.service.Implementations;


import com.internbridge.internbridge_backend.dto.PracticeSessionDTO;

import com.internbridge.internbridge_backend.entity.PracticeSession;
import com.internbridge.internbridge_backend.entity.User;

import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.PracticeSessionRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.PracticeSessionService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class PracticeSessionServiceImpl implements PracticeSessionService {


    @Autowired
    private PracticeSessionRepository practiceSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public PracticeSessionDTO createPracticeSession(PracticeSessionDTO practiceSessionDTO, Long userId) {
        try {
            Optional<User> companyHrOpt = userRepository.findById(userId);
            if (!companyHrOpt.isPresent() || !companyHrOpt.get().getRole().equals("ROLE_COMPANYHR")) {
                throw new RuntimeException("Unauthorized user");
            }

            User companyHr = companyHrOpt.get();

            PracticeSession practiceSession = modelMapper.map(practiceSessionDTO, PracticeSession.class);
            practiceSession.setCompanyHr(companyHr);

            PracticeSession savedSession = practiceSessionRepository.save(practiceSession);

            return modelMapper.map(savedSession, PracticeSessionDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error creating practice session: " + e.getMessage(), e);
        }
    }

    @Override
    public PracticeSessionDTO updatePracticeSession(Long practiceSessionId, PracticeSessionDTO practiceSessionDTO,Long userId) {
        try {
            Optional<PracticeSession> practiceSessionOpt = practiceSessionRepository.findById(practiceSessionId);
            if (!practiceSessionOpt.isPresent()) {
                throw new RuntimeException("Practice session not found");
            }

            PracticeSession practiceSession = practiceSessionOpt.get();
            Optional<User> companyHrOpt = userRepository.findById(userId);
            if (!companyHrOpt.isPresent() || !companyHrOpt.get().getRole().equals("ROLE_COMPANYHR")) {
                throw new RuntimeException("Unauthorized user");
            }

            User companyHr = companyHrOpt.get();

            // Update the session's details
            practiceSession.setTitle(practiceSessionDTO.getTitle());
            practiceSession.setDescription(practiceSessionDTO.getDescription());
            practiceSession.setStartDate(practiceSessionDTO.getStartDate());
            practiceSession.setStartTime(practiceSessionDTO.getStartTime());
            practiceSession.setStatus(practiceSessionDTO.getStatus());
            practiceSession.setMeetingLink(practiceSessionDTO.getMeetingLink());

            practiceSession.setCompanyHr(companyHr);

            PracticeSession updatedSession = practiceSessionRepository.save(practiceSession);

            return modelMapper.map(updatedSession, PracticeSessionDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error updating practice session: " + e.getMessage(), e);
        }
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

    @Override
    public List<PracticeSessionDTO> getPracticeSessionsByHrId(Long hrId) {
        List<PracticeSession> sessions = practiceSessionRepository.findByCompanyHr_UserId(hrId);
        return sessions.stream()
                .map(session -> modelMapper.map(session, PracticeSessionDTO.class))
                .collect(Collectors.toList());
    }
}