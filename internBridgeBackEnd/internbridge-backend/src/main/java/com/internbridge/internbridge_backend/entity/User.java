package com.internbridge.internbridge_backend.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {


    @Id
    //@Column(name="userId",length = 50)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

//    @Column(name="name", nullable=false, unique=true, length=30)
//    @NotBlank(message = "Name cannot be blank")
    private String name;

//    @NotBlank(message = "password should enter")
//    @Column(name="password",nullable=false)
//    @NotBlank(message = "Password cannot be blank")
//    @Size(min = 8, max = 25)
    private String password;


    @Column(name="email",nullable=false,unique=true,length=80)
    @NotBlank(message = "Email cannot be blank")
//    @Email(message = "Please provide a valid email address")
    private String email;

//    @Column(name="company",nullable=false,unique=true,length=50)
//    @NotBlank(message = "company cannot be blank")
    private String company;

//    @Column(name = "phone",nullable=false,unique=true,length=10)
//    @NotBlank(message = "Phone cannot be blank")
//    @Size(max = 10, message = "Phone number cannot exceed 12 characters")
    private String phone;

    private String role;

    private String status;

    @PrePersist
    protected void onCreate() {
        if (this.company == null) {
           this.company = "UOR";
        }
        if (this.status == null) {
            this.status = "registered";
        }

    }
}
