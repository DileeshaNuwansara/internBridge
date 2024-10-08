package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name="practicessession")
public class PracticeSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long sessionId;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalTime startTime;
    private String status;
    private String meetingLink;


}
