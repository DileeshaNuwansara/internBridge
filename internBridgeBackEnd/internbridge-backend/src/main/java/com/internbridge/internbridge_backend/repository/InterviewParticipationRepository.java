package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.InterviewParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewParticipationRepository extends JpaRepository<InterviewParticipation, Long> {

}
