import React, { useState } from 'react';
import axios from 'axios';

const UploadCv = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('/api/cv/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      setMessage('File uploaded successfully.');
      setMessage(`File uploaded successfully: ${response.data.fileName}`);
    } catch (error) {
      setMessage('Error uploading the file.');
    }
}

  return (
    <div>
      <h2>Upload Your Own CV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadCv;