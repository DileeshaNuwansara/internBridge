import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../Layout/Layout';


const AdminAddStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem("userRole");

  // Fetch the list of students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/student');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle deleting a student by ID
  const handleDelete = async (userId) => {
    try {
      await axios.delete('http://localhost:8081/api/v1/student/remove/${userId}');
      setStudents(students.filter(student => student.userId !== userId));
      alert("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student", error);
      alert("Failed to delete student");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
 <Layout>
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student List</h2>
        <Button variant="primary" href="/add-student">Add Student</Button>
      </div>

      {/* Responsive Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>SC Number</th>
            <th>GPA</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.userId}>
              <td>{student.userId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.role}</td>
              <td>{student.status}</td>
              <td>{student.scNumber}</td>
              <td>{student.gpa}</td>
              <td>{student.position}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.userId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
</Layout>
  );
};

export default AdminAddStudent;