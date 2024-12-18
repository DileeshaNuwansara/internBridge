package com.internbridge.internbridge_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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


    @ManyToOne
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @OneToMany(mappedBy = "interview", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<InterviewParticipation> participants  = new ArrayList<>();;


    @OneToMany(mappedBy = "interview")
    private List<Application> applications;

    @ManyToOne
    @JoinColumn(name = "company_hr_id")
    private User companyHR;

}
