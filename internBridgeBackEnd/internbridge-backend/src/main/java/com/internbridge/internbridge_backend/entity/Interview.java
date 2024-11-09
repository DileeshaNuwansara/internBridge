package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="interview")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    private LocalDate startDate;
    private LocalTime startTime;
    private String status;
    private String description;
    private String meetingLink;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> students;

    @ManyToOne
    @JoinTable(
            name = "interview_students",
            joinColumns = @JoinColumn(name = "interview_interview_id"),
            inverseJoinColumns = @JoinColumn(name = "students_user_id")
    )
    private User companyHR;

    @OneToMany(mappedBy = "interview")
    private List<Application> applications;
}
