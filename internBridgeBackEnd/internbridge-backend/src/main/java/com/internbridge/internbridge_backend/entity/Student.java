package com.internbridge.internbridge_backend.entity;

import com.internbridge.internbridge_backend.validation.ValidScNumber;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="scnumber", nullable=false, unique=true, length=30)
    @ValidScNumber  // Custom validator for SC number
    private String scNumber;

    @Column(name="name", nullable=false, unique=true, length=30)
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Column(name="email",nullable=false,unique=true,length=50)
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "name should enter")
    @Column(name="password",nullable=false)
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, max = 25)
    private String password;

    @Column(name="gpa",nullable=false,length=10)
    @DecimalMin(value = "2.0", message = "GPA cannot be less than 2.0")
    @DecimalMax(value = "4.0", message = "GPA cannot be more than 4.0")
    private Double gpa;
    @Column(name="department",length=20)
    private String department;
    @Column(name="position",length=20)
    private String position;
    @Column(name="cv",length=20)
    private String cv;

    @Column(name="phone",nullable=false,unique=true,length=10)
    @NotBlank(message = "Phone cannot be blank")
    @Size(max = 10, message = "Phone number cannot exceed 12 characters")
    private String phone;
    @PrePersist
    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }

    }
}
