// import React, { useEffect, useState } from 'react';
// import { Card, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap';
// import styles from './InterviewDetails.module.scss'; 
// import axios from 'axios';
// import Layout from '../../Layout/Layout';

// const InterviewDetails = () => {
//   const companyHrId = localStorage.getItem('userId'); 

//   const [internshipId, setInternshipId] = useState('');
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [students, setStudents] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [formData, setFormData] = useState({
//     description: '',
//     status: 'Scheduled',
//     startDate: '',
//     startTime: '',
//     meetingLink: '',
//     coordinatorId: '',
//     companyHrId: companyHrId,
//   });
//   const [selectedInterviewId, setSelectedInterviewId] = useState(null);

//   useEffect(() => {
//     const companyHrId = localStorage.getItem('companyHrId');
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       companyHrId: companyHrId,
//     }));
//     fetchInterviews();
//   }, []);

//   useEffect(() => {
//     if (internshipId) fetchAppliedStudents(internshipId);
//   }, [internshipId]);

//   const fetchAppliedStudents = async (internshipId) => {
//     const response = await axios.get(`http://localhost:8081/api/v1/applications/internship/${internshipId}`);
//     setStudents(response.data);
//   };

//   const fetchInterviews = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8081/api/v1/api/v1/interviews/getAll`);
//       setInterviews(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching interviews:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const interviewRequest = {
//         ...formData,
//         studentIds: selectedStudents,
//       };
//       await axios.post(`http://localhost:8081/api/v1/interviews/create`, interviewRequest);
//       resetForm();
//       fetchInterviews();
//       alert('Created an Interview successfully')
//     } catch (error) {
//       console.error('Error creating interview:', error);
//       alert("Error when Creating an Interview");
//     }
//   };

//   const updateInterview = async () => {
//     try {
//       const interviewRequest = {
//         ...formData,
//         studentIds: selectedStudents, 
//       };
//       await axios.put(`http://localhost:8081/api/v1/interviews/update/${selectedInterviewId}`, interviewRequest);
//       resetForm();
//       fetchInterviews(); 
//       alert('Updated the interview successfully.')
//     } catch (error) {
//       console.error('Error updating interview:', error);
//       alert('Error when updatingg an interview state');
//     }
//   };

//   const openUpdateModal = (interview) => {
//     setSelectedInterviewId(interview.interviewId);
//     setFormData({
//       description: interview.description,
//       status: interview.status,
//       startDate: interview.startDate,
//       startTime: interview.startTime,
//       meetingLink: interview.meetingLink,
//       coordinatorId: interview.coordinatorId,
//       companyHrId: companyHrId,
//     });
//     setSelectedStudents(interview.studentIds); 
//     setShowUpdateModal(true);
//   };

//   const deleteInterview = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/api/v1/interviews/delete/${id}`);
//       setInterviews(interviews.filter((interview) => interview.interviewId !== id));
//       alert('Deleted the Interview successfully.')
//     } catch (error) {
//       console.error('Error deleting interview:', error);
//       alert('Error when delete the Interview');
//     }
//   };

//   const toggleStudentSelection = (studentId) => {
//     setSelectedStudents(prev =>
//       prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
//     );
//   };

//   const resetForm = () => {
//     setFormData({
//       description: '',
//       status: 'Scheduled',
//       startDate: '',
//       startTime: '',
//       meetingLink: '',
    
//       companyhrId: companyHrId,
//     });
//     setSelectedStudents([]);
//     setShowCreateModal(false);
//     setShowUpdateModal(false);
//   };

  

//   return (
//     <Layout>
//     <h2>Interview Details</h2>
//     <Container>

//       <div className={styles.header}>
       
//         <Button className={styles.createButton} onClick={() => setShowCreateModal(true)}>
//           Create New Interview
//         </Button>
//       </div>
//       <Row>
//         {interviews.map((interview) => (
//           <Col key={interview.interviewId} md={4} sm={12} className="mb-4">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{interview.description}</Card.Title>
//                 <Card.Text>Status: {interview.status}</Card.Text>
//                 <Card.Text>Start Date: {interview.startDate}</Card.Text>
//                 <Card.Text>Start Time: {interview.startTime}</Card.Text>
//                 <Card.Text>Meeting Link: {interview.meetingLink}</Card.Text>
//                 <Button variant="primary" onClick={() => openUpdateModal(interview)}>
//                   Update
//                 </Button>{' '}
//                 <Button variant="danger" onClick={() => deleteInterview(interview.interviewId)}>
//                   Delete
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Modal show={showCreateModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Interview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStatus">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={formData.status || ''} onChange={handleInputChange}>
//                 <option value="" disabled>Select Status</option>
//                 <option value="Registered">Pending</option>
//                 <option value="Applied">Sheduled</option>
//                 <option value="Hired">Postponed</option>
//                 <option value="Rejected">Cancled</option>
//                 <option value="Interviewed">Interviewed</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group controlId="formStartDate">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStartTime">
//               <Form.Label>Start Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formMeetingLink">
//               <Form.Label>Meeting Link</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="meetingLink"
//                 value={formData.meetingLink}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStudentId">
//               <Form.Label>Select Students</Form.Label>
//               <div>
//                 {students.map(student => (
//                   <div key={student.studentId}>
//                     <Form.Check
//                       type="checkbox"
//                       label={`${student.name} - ${student.email}`}
//                       checked={selectedStudents.includes(student.studentId)}
//                       onChange={() => toggleStudentSelection(student.studentId)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </Form.Group>
//             <Form.Group controlId="formCompanyhrid">
//               <Form.Label>Company HR ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="companyhrId"
//                 value={formData.companyhrId}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={resetForm}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit">
//                 Create Interview
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <Modal show={showUpdateModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Interview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStatus">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={formData.status || ''} onChange={handleInputChange}>
//                 <option value="" disabled>Select Status</option>
//                 <option value="Registered">Pending</option>
//                 <option value="Applied">Sheduled</option>
//                 <option value="Hired">Postponed</option>
//                 <option value="Rejected">Cancled</option>
//                 <option value="Interviewed">Interviewed</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group controlId="formStartDate">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStartTime">
//               <Form.Label>Start Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formMeetingLink">
//               <Form.Label>Meeting Link</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="meetingLink"
//                 value={formData.meetingLink}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStudentId">
//               <Form.Label>Select Students</Form.Label>
//               <div>
//                 {students.map(student => (
//                   <div key={student.studentId}>
//                     <Form.Check
//                       type="checkbox"
//                       label={`${student.name} - ${student.email}`}
//                       checked={selectedStudents.includes(student.studentId)}
//                       onChange={() => toggleStudentSelection(student.studentId)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </Form.Group>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={resetForm}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={updateInterview}>
//                 Update Interview
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//     </Layout>
//   );
// };

// export default InterviewDetails;


import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import styles from './InterviewDetails.module.scss';


const API_BASE_URL = 'http://localhost:8081/api/v1';

const InterviewDetails = () => {
  
  const companyHrId = localStorage.getItem('userId');

  const [internshipId, setInternshipId] = useState('');
  const [interviews, setInterviews] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCandidatesModal, setShowCandidatesModal] = useState(false);
  const [candidatesInterviewId, setCandidatesInterviewId] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    status: 'Scheduled',
    startDate: '',
    startTime: '',
    meetingLink: '',
    companyHrId: companyHrId,
    internshipId:internshipId,

  });
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchInterviews();
    if (internshipId) openCandidatesModal(internshipId);
  }, [internshipId]);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/interviews/getAll`);
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const openCandidatesModal = async (interviewId) => {
    setCandidatesInterviewId(interviewId);
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/internship/${internshipId}`);
      setStudents(response.data);
      setShowCandidatesModal(true);
      alert('Students selecting successfully.');
    } catch (error) {
      console.error('Error assigning students to interview:', error);
      alert('Failed to assign students to interview. Please try again.');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interviewRequest = {
      ...formData,
      studentIds: selectedStudents,
    };
    try {
      await axios.post(`${API_BASE_URL}/interviews/create`, interviewRequest);
      resetForm();
      fetchInterviews();
      alert('Interview created successfully');
    } catch (error) {
      console.error('Error creating interview:', error);
      alert('Error creating the interview');
    }
  };

  const updateInterview = async () => {
    const interviewRequest = {
      ...formData,
      studentIds: selectedStudents,
    };
    try {
      await axios.put(`${API_BASE_URL}/interviews/update/${selectedInterviewId}`, interviewRequest);
      resetForm();
      fetchInterviews();
      alert('Interview updated successfully');
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Error updating the interview');
    }
  };

  


  const openUpdateModal = (interview) => {
    setSelectedInterviewId(interview.interviewId); 
    setFormData({
      description: interview.description,
      status: interview.status,
      startDate: interview.startDate,
      startTime: interview.startTime,
      meetingLink: interview.meetingLink,
      companyHrId,
    });
    setSelectedStudents(interview.studentIds);
    setShowUpdateModal(true);
  };
  
  const assignStudentsToInterview = async () => {
    try {
      await axios.post(`${API_BASE_URL}/interviews/${candidatesInterviewId}/addStudents`, selectedStudents);
      setShowCandidatesModal(false);
      alert('Students assigned successfully');
      fetchInterviews();
    } catch (error) {
      console.error('Error assigning students to interview:', error);
      alert('Failed to assign students to interview. Please try again.');
    }
  };

  



  const deleteInterview = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/interviews/delete/${id}`);
      setInterviews(interviews.filter((interview) => interview.interviewId !== id));
      alert('Interview deleted successfully');
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Error deleting the interview');
    }
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const resetForm = () => {
    setFormData({
      description: '',
      status: 'Scheduled',
      startDate: '',
      startTime: '',
      meetingLink: '',
      companyHrId,
    });
    setSelectedStudents([]);
    setShowCreateModal(false);
    setShowUpdateModal(false);
  };

  return (
    <Layout>
      <h2>Interview Details</h2>
      <Container>
        <div className={styles.header}>
          <Button className={styles.createButton} onClick={() => setShowCreateModal(true)}>
            Create New Interview
          </Button>
        </div>
        <Row>
          {interviews.map((interview) => (
            <Col key={interview.interviewId} md={4} sm={12} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{interview.description}</Card.Title>
                  <Card.Text>Status: {interview.status}</Card.Text>
                  <Card.Text>Start Date: {interview.startDate}</Card.Text>
                  <Card.Text>Start Time: {interview.startTime}</Card.Text>
                  <Card.Text>Meeting Link: {interview.meetingLink}</Card.Text>
                  <Button variant="info" onClick={() => openCandidatesModal(interview.interviewId)}>
                      Add Candidates
                  </Button>

                  <Button variant="primary" onClick={() => openUpdateModal(interview)}>
                    Update
                  </Button>{' '}
                  <Button variant="danger" onClick={() => deleteInterview(interview.interviewId)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Create Interview Modal */}
        <Modal show={showCreateModal} onHide={resetForm}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formMeetingLink">
                <Form.Label>Meeting Link</Form.Label>
                <Form.Control
                  type="text"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                />
              </Form.Group>

             
              <Form.Group controlId="formStudentId">
                <Form.Label>Select Students</Form.Label>
                {students.map((student) => (
                  <Form.Check
                    key={student.studentId}
                    type="checkbox"
                    label={`${student.name} - ${student.email}`}
                    checked={selectedStudents.includes(student.studentId)}
                    onChange={() => toggleStudentSelection(student.studentId)}
                  />
                ))}
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create Interview
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Update Interview Modal */}
        <Modal show={showUpdateModal} onHide={resetForm}>
          <Modal.Header closeButton>
            <Modal.Title>Update Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </Form.Select>

              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formMeetingLink">
                <Form.Label>Meeting Link</Form.Label>
                <Form.Control
                  type="text"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStudentId">
                <Form.Label>Select Students :</Form.Label>
                {students.map((student) => (
                  <Form.Check
                    key={student.studentId}
                    type="checkbox"
                    label={`${student.name} - ${student.email}`}
                    checked={selectedStudents.includes(student.studentId)}
                    onChange={() => toggleStudentSelection(student.studentId)}
                  />
                ))}
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={updateInterview}>
                  Update Interview
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showCandidatesModal} onHide={() => setShowCandidatesModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Assign Students to Interview</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {students.map((student) => (
        <Form.Check
          key={student.studentId}
          type="checkbox"
          label={`${student.name} - ${student.email}`}
          checked={selectedStudents.includes(student.studentId)}
          onChange={() => toggleStudentSelection(student.studentId)}
        />
      ))}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCandidatesModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={assignStudentsToInterview}>
      Add Student List
    </Button>
  </Modal.Footer>
</Modal>



      </Container>
    </Layout>
  );
};

export default InterviewDetails;
