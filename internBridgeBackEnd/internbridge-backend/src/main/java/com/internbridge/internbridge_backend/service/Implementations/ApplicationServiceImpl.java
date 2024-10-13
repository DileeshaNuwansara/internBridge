package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.entity.*;
import com.internbridge.internbridge_backend.repository.*;
import com.internbridge.internbridge_backend.service.ApplicationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ApplicationServiceImpl implements ApplicationService {



        @Autowired
        private ApplicationRepository applicationRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private InternshipRepository internshipRepository;

        @Autowired
        private InterviewRepository interviewRepository;

        @Autowired
        private PracticeSessionRepository practiceSessionRepository;

        @Autowired
        private ModelMapper modelMapper;

        @Override
        public ApplicationDTO createApplication(Long studentId, Long internshipId, Long interviewId, Long practiceSessionId) {
            Student student = (Student) userRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Application application = new Application();
            application.setStudent(student);
            application.setAppliedDate(LocalDate.now());

            // Assign to the relevant activity (internship, interview, or practice session)
            if (internshipId != null) {
                Internship internship = internshipRepository.findById(internshipId)
                        .orElseThrow(() -> new RuntimeException("Internship not found"));
                application.setInternship(internship);
            } else if (interviewId != null) {
                Interview interview = interviewRepository.findById(interviewId)
                        .orElseThrow(() -> new RuntimeException("Interview not found"));
                application.setInterview(interview);
            } else if (practiceSessionId != null) {
                PracticeSession practiceSession = practiceSessionRepository.findById(practiceSessionId)
                        .orElseThrow(() -> new RuntimeException("Practice session not found"));
                application.setPracticeSession(practiceSession);
            }

            application.setStatus(Application.ApplicationStatus.APPLIED);
            Application savedApplication = applicationRepository.save(application);

            return modelMapper.map(savedApplication, ApplicationDTO.class);
        }

        @Override
        public List<ApplicationDTO> getApplicationsByStudent(Long studentId) {
            return applicationRepository.findByStudentUserId(studentId)
                    .stream()
                    .map(application -> modelMapper.map(application, ApplicationDTO.class))
                    .collect(Collectors.toList());
        }

        @Override
        public List<ApplicationDTO> getApplicationsForInternship(Long internshipId) {
            return applicationRepository.findByInternshipInternshipId(internshipId)
                    .stream()
                    .map(application -> modelMapper.map(application, ApplicationDTO.class))
                    .collect(Collectors.toList());
        }

        @Override
        public List<ApplicationDTO> getApplicationsForInterview(Long interviewId) {
            return applicationRepository.findByInterviewInterviewId(interviewId)
                    .stream()
                    .map(application -> modelMapper.map(application, ApplicationDTO.class))
                    .collect(Collectors.toList());
        }

        @Override
        public List<ApplicationDTO> getApplicationsForPracticeSession(Long sessionId) {
            return applicationRepository.findByPracticeSessionPracticesessionId(sessionId)
                    .stream()
                    .map(application -> modelMapper.map(application, ApplicationDTO.class))
                    .collect(Collectors.toList());
        }

    @Override
    public void updateApplicationStatus(Long applicationId, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Convert the String status from DTO to ApplicationStatus enum
        Application.ApplicationStatus status = Application.ApplicationStatus.valueOf(applicationDTO.getStatus().toUpperCase());

        application.setStatus(status);
        applicationRepository.save(application);
    }

        @Override
        public void deleteApplication(Long applicationId) {
            applicationRepository.deleteById(applicationId);
        }
    }