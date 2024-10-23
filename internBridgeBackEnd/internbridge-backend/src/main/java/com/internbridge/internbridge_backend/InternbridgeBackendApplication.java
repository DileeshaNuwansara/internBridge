package com.internbridge.internbridge_backend;

import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.Student;
import com.internbridge.internbridge_backend.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InternbridgeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(InternbridgeBackendApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {

		ModelMapper modelMapper = new ModelMapper();

		modelMapper.typeMap(User.class, StudentDTO.class).addMappings(mapper -> {
			mapper.map(User::getName, StudentDTO::setName);
			mapper.map(User::getEmail, StudentDTO::setEmail);
			mapper.map(User::getPhone, StudentDTO::setPhone);
			mapper.map(User::getRole, StudentDTO::setRole);
			mapper.map(User::getStatus, StudentDTO::setStatus);

		});

			modelMapper.typeMap(Student.class, StudentDTO.class).addMappings(mapper -> {
				mapper.map(Student::getScNumber, StudentDTO::setScNumber);
				mapper.map(Student::getGpa, StudentDTO::setGpa);
				mapper.map(Student::getPosition, StudentDTO::setPosition);
			});


		// Optionally map Student to StudentDTO if needed
		modelMapper.typeMap(Student.class, StudentDTO.class);

		return modelMapper;
	}
}
