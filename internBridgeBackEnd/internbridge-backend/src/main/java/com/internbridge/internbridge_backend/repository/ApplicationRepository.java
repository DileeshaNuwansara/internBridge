package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.Application;
import com.internbridge.internbridge_backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentUserId(Long studentId);
    List<Application> findByInternshipInternshipId(Long internshipId);

    List<Application> findByInterviewInterviewId(Long interviewId);

    List<Application> findByPracticeSessionPracticesessionId(Long practicesessionId);

    List<Application> findByInternship(Internship internship);




    //List<Application> findByStudentUserIdAndStatus(Long studentId, Application.ApplicationStatus status);
}
