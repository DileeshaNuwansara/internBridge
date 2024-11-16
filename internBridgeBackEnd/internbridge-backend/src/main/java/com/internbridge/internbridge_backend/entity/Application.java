package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    //one application to one student

    @ManyToOne
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;
    //many application for one internship

    // Many-to-One: Each application could be for an interview
    @ManyToOne
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;



    public enum ApplicationStatus {
        APPLIED,
        INTERVIEWED,
        ACCEPTED,
        REJECTED
    }

    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    private LocalDate appliedDate;

    @ManyToOne
    //@JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Lob
    //@Column(name = "cv", nullable = true)
    private byte[] cv;

}
