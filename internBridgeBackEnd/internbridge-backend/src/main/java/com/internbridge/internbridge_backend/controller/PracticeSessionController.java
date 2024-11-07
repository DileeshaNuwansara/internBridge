package com.internbridge.internbridge_backend.controller;


import com.internbridge.internbridge_backend.dto.PracticeSessionDTO;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.service.PracticeSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/practice-sessions")
public class PracticeSessionController {

    @Autowired
    private PracticeSessionService practiceSessionService;

    @Autowired
    public PracticeSessionController(PracticeSessionService practiceSessionService) {
        this.practiceSessionService = practiceSessionService;
    }


    @PostMapping("/create{userId}")
    public ResponseEntity<PracticeSessionDTO> createPracticeSession(
            @RequestBody PracticeSessionDTO practiceSessionDTO,
            @PathVariable Long userId) {

        PracticeSessionDTO createdSession = practiceSessionService.createPracticeSession(practiceSessionDTO, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdSession);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PracticeSessionDTO> updatePracticeSession(
            @PathVariable Long id,
            @RequestBody PracticeSessionDTO practiceSessionDTO,
            @RequestHeader("userId") Long userId) {
        try {
            PracticeSessionDTO updatedSession = practiceSessionService.updatePracticeSession(id, practiceSessionDTO, userId);
            return new ResponseEntity<>(updatedSession, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePracticeSession(@PathVariable Long id, @AuthenticationPrincipal User user) {
        practiceSessionService.deletePracticeSession(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<PracticeSessionDTO>> getAllPracticeSessions(@AuthenticationPrincipal User user) {
        List<PracticeSessionDTO> sessions = practiceSessionService.getAllPracticeSessions(user);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PracticeSessionDTO> getPracticeSessionById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        PracticeSessionDTO session = practiceSessionService.getPracticeSessionById(id, user);
        return new ResponseEntity<>(session, HttpStatus.OK);


    }

    @GetMapping("/hr/{hrId}")
    public ResponseEntity<List<PracticeSessionDTO>> getPracticeSessionsByHrId(@PathVariable Long hrId) {
        List<PracticeSessionDTO> sessions = practiceSessionService.getPracticeSessionsByHrId(hrId);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

}
