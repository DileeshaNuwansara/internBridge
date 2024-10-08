package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Internship internship;

    private String status;

    private Date appliedDate;

}
