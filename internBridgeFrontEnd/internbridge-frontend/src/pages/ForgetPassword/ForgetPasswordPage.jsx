import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import styles from './ForgotPassword.module.scss';  // Assume you have styles for this page
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import { useNavigate } from 'react-router-dom';


const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8081/api/v1/forgotPwd/verifyMail/${email}`, { email });

      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
        navigate('/otp-verification', { state: { email } });
      } else {
        setMessage('Failed to send reset link. Please try again.');
      }
    } catch (error) {
      console.error('Error in sending reset link:', error);
      setMessage('Error in sending reset link. Please try again.');
    }
  };

  return (
    <>
    <LandingPageNavbar/><br/>
    <div className={styles.forgotPasswordPage}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
   <div>
   <Footer />
 </div>
 </>
  );
};

export default ForgetPasswordPage;
