package com.internbridge.internbridge_backend;

import com.internbridge.internbridge_backend.dto.InternshipDTO;
import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.dto.PracticeSessionDTO;
import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.*;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@Configuration
@EnableJpaRepositories(basePackages = "com.internbridge.internbridge_backend.repository")
public class InternbridgeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(InternbridgeBackendApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

//		modelMapper.typeMap(User.class, StudentDTO.class).addMappings(mapper -> {
//			mapper.map(User::getName, StudentDTO::setName);
//			mapper.map(User::getEmail, StudentDTO::setEmail);
//			mapper.map(User::getPhone, StudentDTO::setPhone);
//
//		});
//
//		modelMapper.typeMap(Student.class, StudentDTO.class).addMappings(mapper -> {
//			mapper.map(Student::getScNumber, StudentDTO::setScNumber);
//			mapper.map(Student::getGpa, StudentDTO::setGpa);
//			mapper.map(Student::getPosition, StudentDTO::setPosition);
//		});


		return modelMapper;
	}
}