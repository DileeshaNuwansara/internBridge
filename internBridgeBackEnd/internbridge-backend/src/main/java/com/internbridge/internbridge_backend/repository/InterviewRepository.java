package com.internbridge.internbridge_backend.repository;


import com.internbridge.internbridge_backend.entity.Interview;
import com.internbridge.internbridge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByStudents_UserId(Long userId);
    List<Interview> findByCompanyHR(User companyHR);



}
