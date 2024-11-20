package com.internbridge.internbridge_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "student")
@PrimaryKeyJoinColumn(name = "user_id")
public class Student extends User {

    @Column( unique=true, length=30)
    private String scNumber;



    @Column(length=10)
    @DecimalMin(value = "2.0", message = "GPA cannot be less than 2.0")
    @DecimalMax(value = "4.0", message = "GPA cannot be more than 4.0")
    private Double gpa;


    @Column(length=20)
    private String position;

    @OneToMany(mappedBy = "student",  cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Application> applications;


    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PracticeSessionAttendance> practiceSessions;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<InterviewParticipation> participants;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyhr_id", nullable = true)
    private User companyHr;


//    @Lob
//    private byte[] cv;




    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }
    }

}