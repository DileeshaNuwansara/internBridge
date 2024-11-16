package com.internbridge.internbridge_backend.service.Implementations;

import com.internbridge.internbridge_backend.dto.ApplicationDTO;
import com.internbridge.internbridge_backend.dto.InternshipDTO;
import com.internbridge.internbridge_backend.entity.*;
import com.internbridge.internbridge_backend.exception.ResourceNotFoundException;
import com.internbridge.internbridge_backend.repository.*;
import com.internbridge.internbridge_backend.service.ApplicationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ApplicationServiceImpl implements ApplicationService {



        @Autowired
        private ApplicationRepository applicationRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private StudentRepository studentRepository;


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
            }

            application.setApplicationStatus(Application.ApplicationStatus.APPLIED);
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

//        @Override
//        public List<ApplicationDTO> getApplicationsForPracticeSession(Long sessionId) {
//            return applicationRepository.findByPracticeSessionPracticesessionId(sessionId)
//                    .stream()
//                    .map(application -> modelMapper.map(application, ApplicationDTO.class))
//                    .collect(Collectors.toList());
//        }

    @Override
    public void updateApplicationStatus(Long applicationId, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStudent(studentRepository.findById(applicationDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found")));
        application.setInternship(internshipRepository.findById(applicationDTO.getInternshipId()).orElse(null));
        application.setInterview(interviewRepository.findById(applicationDTO.getInterviewId()).orElse(null));


        // Set status using enum conversion
        if (applicationDTO.getApplicationStatus() != null) {
            application.setApplicationStatus(Application.ApplicationStatus.valueOf(applicationDTO.getApplicationStatus().toUpperCase()));
        }

        application.setAppliedDate(applicationDTO.getAppliedDate());
        application.setUser(userRepository.findById(applicationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        application.setCv(applicationDTO.getCv());

        applicationRepository.save(application);
    }


        @Override
        public void deleteApplication(Long applicationId) {
            applicationRepository.deleteById(applicationId);
        }

    @Override
    public List<ApplicationDTO> getApplicationsByInternshipId(Long internshipId) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid internship ID"));

        List<Application> applications = applicationRepository.findByInternship(internship);
        return applications.stream()
                .map(application -> modelMapper.map(application, ApplicationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationDTO applyToInternship(Long studentId, Long internshipId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found with ID: " + internshipId));

        Application application = new Application();
        application.setStudent(student);
        application.setInternship(internship);
        application.setAppliedDate(LocalDate.now());
        application.setApplicationStatus(Application.ApplicationStatus.APPLIED);

        Application savedApplication = applicationRepository.save(application);

        return modelMapper.map(savedApplication, ApplicationDTO.class);

    }

    @Override
    public List<InternshipDTO> getInternshipsByStudent(Long studentId) {
        List<Application> applications = applicationRepository.findByStudentUserId(studentId);
        return applications.stream()
                .map(app -> modelMapper.map(app.getInternship(), InternshipDTO.class))
                .collect(Collectors.toList());

    }


    @Override
    public ApplicationDTO uploadCv(Long studentId, MultipartFile file) throws IOException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Application application = new Application();
        application.setStudent(student);
        application.setCv(file.getBytes());

        applicationRepository.save(application);

        // Use ModelMapper to convert Application to ApplicationDTO
        return modelMapper.map(application, ApplicationDTO.class);
    }

    @Override
    public List<byte[]> getCvByStudentId(Long studentId) {
        List<Application> applications = applicationRepository.findByStudentUserId(studentId);

        if (applications != null && !applications.isEmpty()) {
            return applications.stream()
                    .map(Application::getCv)
                    .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }

    @Override
    public byte[] generateCv(Long studentId) {
//        String cvContent = "Generated CV for student with ID: " + studentId;
//        return cvContent.getBytes();

        return new byte[0];
    }

}
