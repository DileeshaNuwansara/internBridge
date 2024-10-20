package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.InternshipDTO;
import com.internbridge.internbridge_backend.entity.Internship;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.repository.InternshipRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.InternshipService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InternshipServiceImpl implements InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public InternshipDTO createInternship(InternshipDTO internshipDTO, Long companyHrId) {
        User user = userRepository.findByUserId(companyHrId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Internship internship = modelMapper.map(internshipDTO, Internship.class);
        internship.setUser(user); // Set the user (HR) who creates the internship

        Internship savedInternship = internshipRepository.save(internship);
        return modelMapper.map(savedInternship, InternshipDTO.class);
    }

    @Override
    public InternshipDTO getInternshipById(Long internshipId) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        // Map Internship entity to DTO
        return modelMapper.map(internship, InternshipDTO.class);
    }

    @Override
    public List<InternshipDTO> getAllInternships() {
        List<Internship> internships = internshipRepository.findAllInternshipsSortedByDate();

        // Map List<Internship> to List<InternshipDTO>
        return internships.stream()
                .map(internship -> modelMapper.map(internship, InternshipDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<InternshipDTO> getInternshipsByCompanyHr(Long companyHrId) {
        User user = userRepository.findByUserId(companyHrId);
        if (user == null) {
            return Collections.emptyList(); // Return empty if user not found
        }

        List<Internship> internships = internshipRepository.findByUser(user);

        // Map List<Internship> to List<InternshipDTO>
        return internships.stream()
                .map(internship -> modelMapper.map(internship, InternshipDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public InternshipDTO updateInternship(Long internshipId, InternshipDTO internshipDTO) {
        // Find the existing internship by ID
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        // Map the updated details from DTO to the existing Internship entity
        modelMapper.map(internshipDTO, internship);

        // Save the updated internship
        Internship updatedInternship = internshipRepository.save(internship);

        // Map updated Internship entity back to DTO
        return modelMapper.map(updatedInternship, InternshipDTO.class);
    }

    @Override
    public void deleteInternship(Long internshipId) {
        // Find the internship by ID
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        // Delete the internship
        internshipRepository.delete(internship);
    }
}