package com.internbridge.internbridge_backend.repository;

import com.internbridge.internbridge_backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {



    User findByEmail(String email);
    User findByUserId(Long id);
    List<User> findByRole(String role);


    @Modifying
    @Query("UPDATE User u SET u.password = ?1 WHERE u.email = ?2")
    void updatePassword(String newPassword, String email);



}
