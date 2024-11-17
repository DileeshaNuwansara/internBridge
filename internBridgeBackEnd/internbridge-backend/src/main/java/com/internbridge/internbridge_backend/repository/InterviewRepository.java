package com.internbridge.internbridge_backend.repository;


import com.internbridge.internbridge_backend.entity.Internship;
import com.internbridge.internbridge_backend.entity.Interview;
import com.internbridge.internbridge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    @Query("SELECT i FROM Interview i JOIN i.participants p WHERE p.student.participants = :userId")
    List<Interview> findByStudentId(@Param("userId") Long userId);

    List<Interview> findByInternship(Internship internship);

    List<Interview> findByCompanyHR(User companyHR);

    List<Interview> findByInternshipInternshipId(Long internshipId);





}
