package com.internbridge.internbridge_backend.repository;


import com.internbridge.internbridge_backend.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByStudentUserId(Long studentId);


}
