package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Table(name = "internship")
@Entity
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long internshipId;

    private String title;
    private String description;
    private String requirements;
    private String position;
    private LocalDate startDate;
    private int availablePositions;

    @ManyToOne
    private User ROLE_COMPANYHR;

    @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL)
    private List<Application> applications = new ArrayList<>();


}
