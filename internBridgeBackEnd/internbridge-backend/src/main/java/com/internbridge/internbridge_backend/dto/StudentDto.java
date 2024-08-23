package com.internbridge.internbridge_backend.dto;

import com.internbridge.internbridge_backend.validation.ValidScNumber;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class StudentDto {
    //private Long id;

    @NotBlank(message = "SC number cannot be blank")
    @ValidScNumber // Custom validator for SC number
    private String scNumber;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 30, message = "Name cannot exceed 30 characters")
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, max = 25, message = "Password must be between 8 and 25 characters")
    private String password;

    @DecimalMin(value = "2.0", message = "GPA cannot be less than 2.0")
    @DecimalMax(value = "4.0", message = "GPA cannot be more than 4.0")
    private Double gpa;

    private String department;

    private String position;

    private String cv;

    @NotBlank(message = "Phone cannot be blank")
    @Size(max = 10, message = "Phone number cannot exceed 12 characters")
    private String phone;


}
