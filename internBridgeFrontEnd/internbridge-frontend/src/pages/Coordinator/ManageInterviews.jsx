import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import './CoordinatorInterviews.scss'; 
import Layout from '../../Layout/Layout';

const ManageInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(5);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/interviews/getAll');
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await axios.delete(`http://localhost:8081/api/v1/interviews/delete/${id}`);
        fetchInterviews(); 
      } catch (error) {
        console.error('Error deleting interview:', error);
      }
    }
  };

  const handleUpdate = (interview) => {
    setSelectedInterview(interview);
    setShowUpdateModal(true); 
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8081/api/v1/interviews/update/${selectedInterview.id}`, selectedInterview);
      setShowUpdateModal(false);
      fetchInterviews(); 
      alert("Fetching interview data..")
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Error Updating an interview ...!');
    }
  };

  
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = interviews.slice(indexOfFirstInterview, indexOfLastInterview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userRole = localStorage.getItem('role');
  return (
    <Layout role = {userRole} >
    <div className="interviews-container">
      {currentInterviews.map((interview) => (
        <Card className="interview-card" key={interview.id}>
          <Card.Body>
            <Card.Title>{interview.description}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date(interview.startDate).toLocaleDateString()} <br />
              <strong>Time:</strong> {interview.startTime} <br />
              <strong>Status:</strong> {interview.status} <br />
              
              <Button href={interview.meetingLink} target="_blank" variant="primary">
                Join Meeting
              </Button>
            </Card.Text>
            <div className="button-group">
              <Button variant="warning" onClick={() => handleUpdate(interview)}>Update</Button>
              <Button variant="danger" onClick={() => handleDelete(interview.id)}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Pagination */}
      <Pagination>
        {[...Array(Math.ceil(interviews.length / interviewsPerPage)).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={selectedInterview ? selectedInterview.startDate : ''}
              onChange={(e) => setSelectedInterview({ ...selectedInterview, startDate: e.target.value })}
            />
            <br />
            <label>Time:</label>
            <input
              type="time"
              value={selectedInterview ? selectedInterview.startTime : ''}
              onChange={(e) => setSelectedInterview({ ...selectedInterview, startTime: e.target.value })}
            />
            <br />
            <label>Status:</label>
            <input
              type="text"
              value={selectedInterview ? selectedInterview.status : ''}
              onChange={(e) => setSelectedInterview({ ...selectedInterview, status: e.target.value })}
            />
            <br />
            <label>Description:</label>
            <input
              type="text"
              value={selectedInterview ? selectedInterview.description : ''}
              onChange={(e) => setSelectedInterview({ ...selectedInterview, description: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Layout>
  );
};

export default ManageInterviews;