package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Application;
import com.internbridge.internbridge_backend.entity.PracticeSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Long> {

    List<PracticeSession> findByCompanyHr_UserId(Long hrId);


}
