import React from 'react';
// import { useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import styles from './Signout.module.scss';

const Signout = () => {
  const navigate = useNavigate();

  // Function to handle JWT token 
  const handleJWTSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    navigate('/signin'); 
  };


  // const { signOut } = useGoogleLogout({
  //   clientId: 'YOUR_GOOGLE_CLIENT_ID',
  //   onLogoutSuccess: () => {
  //     handleJWTSignout();
  //   },
  // });

  const handleSignout = () => {
    // If logged in with Google
    // signOut();
    // JWT signout
    handleJWTSignout();
  };

  return (
    <div className={styles.signoutContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log out</h1>
        <p className={styles.message}>You have been logged out successfully.</p>
        <button className={styles.btn} onClick={handleSignout}>
        Redirecting to login...
        </button>
      </div>
    </div>
  );
};

export default Signout;
