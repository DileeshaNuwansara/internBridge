package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.entity.Interview;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.InterviewRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.InterviewService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewServiceImpl implements InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public List<InterviewDTO> createInterview(InterviewDTO interviewDTO) {
        List<InterviewDTO> createdInterviews = new ArrayList<>();

        Interview interview = modelMapper.map(interviewDTO, Interview.class);

        // Retrieve list of students by User IDs
        List<User> students = userRepository.findAllById(interviewDTO.getStudentIds()).stream()
                .filter(user -> "STUDENT".equals(user.getRole())) // Ensure they are students
                .collect(Collectors.toList());

        interview.setStudents(students);
        interviewRepository.save(interview);

        createdInterviews.add(modelMapper.map(interview, InterviewDTO.class));
        return createdInterviews;
    }

    @Override
    public InterviewDTO updateInterview(Long interviewId, InterviewDTO interviewDTO) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        interview.setDescription(interviewDTO.getDescription());
        interview.setStatus(interviewDTO.getStatus());
        interview.setStartDate(interviewDTO.getStartDate());
        interview.setStartTime(interviewDTO.getStartTime());
        interview.setMeetingLink(interviewDTO.getMeetingLink());

        List<User> students = userRepository.findAllById(interviewDTO.getStudentIds()).stream()
                .filter(user -> "STUDENT".equals(user.getRole()))
                .collect(Collectors.toList());

        interview.setStudents(students);
        interviewRepository.save(interview);

        return modelMapper.map(interview, InterviewDTO.class);
    }

    @Override
    public void deleteInterview(Long id) {
        if (!interviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Interview not found with id: " + id);
        }
        interviewRepository.deleteById(id);
    }

    @Override
    public InterviewDTO getInterviewById(Long interviewId) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with id: " + interviewId));
        return modelMapper.map(interview, InterviewDTO.class);
    }

    @Override
    public List<InterviewDTO> getAllInterviews() {
        return interviewRepository.findAll().stream()
                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<InterviewDTO> getInterviewsByStudentId(Long studentId) {
        return interviewRepository.findByStudents_UserId(studentId).stream()
                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<InterviewDTO> getAllInterviewsByCompanyHR(Long companyHrId) {
        User companyHr = userRepository.findById(companyHrId)
                .orElseThrow(() -> new ResourceNotFoundException("Company HR not found"));

        return interviewRepository.findByCompanyHR(companyHr).stream()
                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
                .collect(Collectors.toList());
    }

//    @Override
//    public List<InterviewDTO> getAllInterviewsByCompanyHR(User companyHr) {
//        return interviewRepository.findByCompanyHr(companyHr).stream()
//                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
//                .collect(Collectors.toList());
//    }

//    @Override
//    public List<InterviewDTO> getAllInterviewsByCompanyHR(Long companyHrId) {
//        return interviewRepository.findByCompanyHR_UserId(companyHrId).stream()
//                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
//                .collect(Collectors.toList());
//    }
}
