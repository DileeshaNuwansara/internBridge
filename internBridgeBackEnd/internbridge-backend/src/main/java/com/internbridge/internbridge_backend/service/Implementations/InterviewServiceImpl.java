package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.InterviewDTO;
import com.internbridge.internbridge_backend.dto.StudentDTO;
import com.internbridge.internbridge_backend.entity.*;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.*;
import com.internbridge.internbridge_backend.service.InterviewService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private InterviewParticipationRepository interviewParticipationRepository;


    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;




    @Override
    @Transactional
    public InterviewDTO createInterview(InterviewDTO interviewDTO) {
        Interview interview = modelMapper.map(interviewDTO, Interview.class);
        Interview savedInterview = interviewRepository.save(interview);
        return modelMapper.map(savedInterview, InterviewDTO.class);

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


        Interview updatedInterview = interviewRepository.save(interview);
        return modelMapper.map(updatedInterview, InterviewDTO.class);

    }

    @Override
    @Transactional
    public void deleteInterview(Long interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with id: " + interviewId));
        interviewRepository.delete(interview);


    }

    @Override
    @Transactional
    public void addStudentsToInterview(Long interviewId, List<Long> studentIds) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with id: " + interviewId));

        Internship internship = interview.getInternship();
        if (internship == null) {
            throw new RuntimeException("No internship is associated with this interview.");
        }

        List<Application> applications = applicationRepository.findByInternshipInternshipId(internship.getInternshipId());


        if (applications.isEmpty()) {
            throw new RuntimeException("No students have applied to this internship.");
        }

        List<InterviewParticipation> participants = new ArrayList<>();

        for (Long studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

            InterviewParticipation participation = new InterviewParticipation();
            participation.setInterview(interview);
            participation.setStudent(student);
            participation.setInterviewStatus("Scheduled");

            participants.add(participation);
        }

        interview.getParticipants().addAll(participants);
        Interview updatedInterview = interviewRepository.save(interview);

        InterviewDTO interviewDTO = modelMapper.map(updatedInterview, InterviewDTO.class);
        List<StudentDTO> assignedStudents = updatedInterview.getParticipants().stream()
                .map(participation -> {
                    StudentDTO studentDTO = modelMapper.map(participation.getStudent(), StudentDTO.class);
                    return studentDTO;
                })
                .toList();

        interviewDTO.setAssignedStudents(assignedStudents);

    }

    @Override
    public List<InterviewDTO> getInterviewsWithAssignedStudents(Long internshipId) {
        List<Interview> interviews = interviewRepository.findByInternshipInternshipId(internshipId);

        return interviews.stream().map(interview -> {
            InterviewDTO interviewDTO = modelMapper.map(interview, InterviewDTO.class);

            List<StudentDTO> assignedStudents = interview.getParticipants().stream()
                    .map(participation -> modelMapper.map(participation.getStudent(), StudentDTO.class))
                    .collect(Collectors.toList());

            interviewDTO.setAssignedStudents(assignedStudents);

            return interviewDTO;
        }).collect(Collectors.toList());
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
        List<Interview> interviews = interviewRepository.findByStudentId(studentId);
            System.out.println("Retrieved interviews for studentId " + studentId + ": " + interviews.size());
            return interviews.stream()
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
}
