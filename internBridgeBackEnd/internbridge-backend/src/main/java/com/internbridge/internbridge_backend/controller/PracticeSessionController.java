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

    @PostMapping
    public ResponseEntity<PracticeSessionDTO> createPracticeSession(@RequestBody PracticeSessionDTO practiceSessionDTO, @AuthenticationPrincipal User user) {
        PracticeSessionDTO createdSession = practiceSessionService.createPracticeSession(practiceSessionDTO, user);
        return new ResponseEntity<>(createdSession, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PracticeSessionDTO> updatePracticeSession(@PathVariable Long id, @RequestBody PracticeSessionDTO practiceSessionDTO, @AuthenticationPrincipal User user) {
        PracticeSessionDTO updatedSession = practiceSessionService.updatePracticeSession(id, practiceSessionDTO, user);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
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
}
