package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
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
        @Column(name = "image_data", columnDefinition = "MEDIUMBLOB")
        private byte[] imageData;

        // Mapping to the user who created the internship (nullable)
        @ManyToOne
        @JoinColumn(name = "user_id", nullable = true) // Should match nullable constraint from the DB
        private User user;

        @OneToMany(mappedBy = "internship")
        private List<Application> applications;
}
