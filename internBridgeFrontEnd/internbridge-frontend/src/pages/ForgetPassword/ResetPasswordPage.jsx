import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.scss';  

const ResetPasswordPage = () => {
  const { token } = useParams();  // Get the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8081/api/v1/user/reset-password/${token}`, { password });
      if (response.status === 200) {
        setMessage('Password has been reset successfully!');
        navigate('/signin');
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Error during password reset. Please try again.');
    }
  };

  return (
    <div className={styles.resetPasswordPage}>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
