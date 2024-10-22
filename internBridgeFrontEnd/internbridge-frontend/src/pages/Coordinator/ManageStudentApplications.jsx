import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import styles from './CoordinatorManageApplications.module.scss'; 
import Layout from '../../Layout/Layout';

const ManageStudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/v1/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`/api/v1/applications/${applicationId}`);
        fetchApplications();
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleUpdate = (application) => {
    setSelectedApplication(application);
    setStatus(application.status);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async () => {
    const updatedApplication = { ...selectedApplication, status };

    try {
      await axios.put(`/api/v1/applications/${selectedApplication.applicationId}/status`, updatedApplication);
      setShowUpdateModal(false);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleViewCV = async (applicationId) => {
    try {
      const response = await axios({
        url: `/api/v1/applications/${applicationId}/cv`, // Backend URL to get the CV
        method: 'GET',
        responseType: 'blob', 
      });

      // Create a URL for the fetched PDF
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      
      
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `CV_${applicationId}.pdf`); // Corrected filename
      document.body.appendChild(fileLink);
      fileLink.click();
      
   

    } catch (error) {
      console.error('Error fetching CV:', error);
    }
  };

  
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
      <Layout>
        <div className={styles['coordinator-applications-container']}>
          <h2>Manage Applications</h2>
          <Table responsive bordered hover className={styles['applications-table']}>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Student ID</th>
                <th>Internship ID</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map(application => (
                <tr key={application.applicationId}>
                  <td>{application.applicationId}</td>
                  <td>{application.studentId}</td>
                  <td>{application.internshipId}</td>
                  <td>{application.status}</td>
                  <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleViewCV(application.applicationId)}>
                      View CV
                    </Button>{' '}
                    <Button variant="warning" onClick={() => handleUpdate(application)}>Update</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(application.applicationId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
          {/* Pagination */}
          <Pagination>
            {[...Array(Math.ceil(applications.length / applicationsPerPage)).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
    
          {/* Modal for Updating Application Status */}
          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Application Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="statusSelect">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                    <option value="OFFER_MADE">Offer Made</option>
                    <option value="REJECTED">Rejected</option>
                  </Form.Control>
                </Form.Group>
              </Form>
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

export default ManageStudentApplications;
