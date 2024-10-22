import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import styles from './ActiveInternsStatus.module.scss'; 
import Layout from '../../Layout/Layout';
const ActiveInternsStatus = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const companyHrId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchStudents = async () => {
            if (!companyHrId) {
                console.error('Company HR ID is not available');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/api/v1/students/companyHr/${companyHrId}`);
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [companyHrId]);

    const userRole = localStorage.getItem('role');

    if (loading) {
        return <Spinner animation="border" className={styles.spinner} />;
    }

    return (
      <Layout role ={userRole}>
        <div className={styles.container}>
            <h2 className={styles.title}>Active Interns</h2>
            <Table responsive bordered hover className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>SC Number</th>
                        <th>GPA</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.userId}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.scNumber}</td>
                                <td>{student.gpa}</td>
                                <td>{student.position}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className={styles.noData}>No active interns found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
      </Layout>
    );
};

export default ActiveInternsStatus;
