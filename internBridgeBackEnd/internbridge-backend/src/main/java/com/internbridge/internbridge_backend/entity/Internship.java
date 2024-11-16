package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "internship")
public class Internship {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "internship_id")
        private Long internshipId;

        @Column(name = "title")
        private String title;

        @Column(name = "description")
        private String description;

        @Column(name = "requirements")
        private String requirements;

        @Column(name = "position")
        private String position;

        @Column(name = "start_date")
        private LocalDate startDate;

        @Column(name = "available_positions")
        private int availablePositions;

        @Column(name = "company")
        private String company;

        @Lob
        @Column( columnDefinition = "MEDIUMBLOB")
        private byte[] imageData;


        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @OneToMany(mappedBy = "internship")
        private List<Application> applications;

        @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Interview> interviews;
}
