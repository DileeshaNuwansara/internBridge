import React from 'react';
import './SignInButton.css';
import { FaUser } from 'react-icons/fa';

const SignInButton = () => {
  return (
    <button className="sign-in-button">
      <FaUser className="me-2" /> Sign In
    </button>
  );
};

export default SignInButton;
