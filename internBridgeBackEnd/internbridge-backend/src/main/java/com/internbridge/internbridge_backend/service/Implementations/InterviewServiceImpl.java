package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.entity.Interview;
import com.internbridge.internbridge_backend.entity.User;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.InterviewRepository;
import com.internbridge.internbridge_backend.repository.UserRepository;
import com.internbridge.internbridge_backend.service.InterviewService;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public InterviewDTO createInterview(InterviewDTO interviewDTO)  {
        try {
            Interview interview = modelMapper.map(interviewDTO, Interview.class);
            User student = userRepository.findById(interviewDTO.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
            student.setUserId(interviewDTO.getStudentId());
            interview.setStudent(student);

            User coordinator = new User();
            coordinator.setUserId(interviewDTO.getCoordinatorId());
            interview.setCoordinator(coordinator);

            Interview savedInterview = interviewRepository.save(interview);
            return modelMapper.map(savedInterview, InterviewDTO.class);

        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid input data: " + e.getMessage());  // Replaced BadRequestException
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while creating the interview: " + e.getMessage());
        }
    }



    @Override
    public InterviewDTO updateInterview(Long id, InterviewDTO interviewDTO) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with id: " + id));

        try {
            interview.setStartDate(interviewDTO.getStartDate());
            interview.setStartTime(interviewDTO.getStartTime());
            interview.setStatus(interviewDTO.getStatus());
            interview.setDescription(interviewDTO.getDescription());
            interview.setMeetingLink(interviewDTO.getMeetingLink());

            User student = new User();
            student.setUserId(interviewDTO.getStudentId());
            interview.setStudent(student);

            User coordinator = new User();
            coordinator.setUserId(interviewDTO.getCoordinatorId());
            interview.setCoordinator(coordinator);

            Interview updatedInterview = interviewRepository.save(interview);
            return modelMapper.map(updatedInterview, InterviewDTO.class);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid input data: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while updating the interview: " + e.getMessage());
        }
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
        return interviewRepository.findByStudentUserId(studentId).stream()
                .map(interview -> modelMapper.map(interview, InterviewDTO.class))
                .collect(Collectors.toList());
    }
}