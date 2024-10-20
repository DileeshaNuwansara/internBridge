import React, { useState } from 'react';
import axios from 'axios';

const UploadGeneratedCv = () => {
  const [message, setMessage] = useState('');

  const studentId = localStorage.getItem('userId');

  const handleGenerateCv = async () => {
    try {
      const response = await axios.get(`/api/v1/cv/generate?studentId=${studentId}`, {
        responseType: 'blob', // Expecting a PDF file in the response
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cv.pdf');
      document.body.appendChild(link);
      link.click();

      setMessage('CV generated and downloaded successfully.');
    } catch (error) {
      setMessage('Error generating the CV.');
    }
  };

  return (
    <div>
      <h2>Generate and Upload CV</h2>
      <button onClick={handleGenerateCv}>Generate CV</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadGeneratedCv;
