package com.internbridge.internbridge_backend.entity;

import com.internbridge.internbridge_backend.entity.Application;
import com.internbridge.internbridge_backend.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

import java.util.List;
@Getter
@Setter
@Data
@NoArgsConstructor
@Entity
public class Student extends User {

    @Column(name="scnumber",  unique=true, length=30)
//    @ValidScNumber  validator for SC number
    private String scNumber;



    @Column(length=10)
    @DecimalMin(value = "2.0", message = "GPA cannot be less than 2.0")
    @DecimalMax(value = "4.0", message = "GPA cannot be more than 4.0")
    private Double gpa;


    @Column(length=20)
    private String position;

    @ManyToOne
    @JoinColumn(name = "company_hr_id", nullable = false)
    private User companyHr;

//    @Lob
//    private byte[] cv;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications;


    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }
    }

}