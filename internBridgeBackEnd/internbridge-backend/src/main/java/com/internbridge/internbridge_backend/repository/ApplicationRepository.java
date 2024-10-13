package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentUserId(Long studentId);
    List<Application> findByInternshipInternshipId(Long internshipId);

    List<Application> findByInterviewInterviewId(Long interviewId);

    List<Application> findByPracticeSessionPracticesessionId(Long practicesessionId);

    //List<Application> findByStudentUserIdAndStatus(Long studentId, Application.ApplicationStatus status);
}
