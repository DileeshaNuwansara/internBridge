package com.internbridge.internbridge_backend.entity;

//import com.internbridge.internbridge_backend.validation.ValidScNumber;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student")
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

    @Lob
    private byte[] cv;


    protected void onCreate() {
        if (this.position == null) {
            this.position = "Software Engineer";
        }
    }

}
