import React, { useState } from 'react';
import styles from './Signin.module.scss';
import '../../App.scss';
import { GoPaperAirplane } from "react-icons/go";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import video from '../../assets/videos/sigin.mp4';
import logo from '../../assets/imgs/internbridge_logo.png';
import axios from 'axios';
const Signin = () => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '' 
      });

      const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:8081/api/v1/authuser/login', formData,{
          headers: {
              'Content-Type': 'application/json',
          },
      });
        if (response.status === 200) {
          const { token,userId, role, email, message, status } = response.data;

          

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
            localStorage.setItem('message',message);
            localStorage.setItem('status', status);

            console.log('Token:', token);
            console.log('UserId:', userId);
            console.log('Role:', role);
            console.log('Status:', status);

          
          alert('Login Successful');
          console.log('User role from localStorage:', localStorage.getItem("role"));

          //navigate(`/${role.toLowerCase()}/dashboard`);

          if (role === 'ROLE_ADMIN') {
            navigate('/admin/dashboard');
          } else if (role === 'ROLE_STUDENT') {
            navigate('/student/dashboard');
          } else if (role === 'ROLE_COMPANYHR') {
            navigate('/companyhr/dashboard');
          } else if (role === 'ROLE_COORDINATOR') {
            navigate('/coordinator/dashboard');
          } else {
            console.log("role : ",role)
            //navigate('/nopage');  
          }
        
        } 
      } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login: ' + (error.response?.data?.message || ' Login error'));
      }
};

  return (
    <>
      <div className={styles.signinPage}>
        <div className={`${styles.container} flex`}>
          
          <div className={styles.videoDiv}>
                <video src={video} autoPlay muted loop></video>
            
                <div className={styles.textDiv}>
                <h2 className={styles.title}>Create An Account </h2>
                <p>Adopt to industrial experience</p>
            </div>

            <div className={styles.footerDiv}>
                <span className={styles.text}>Don't have an account?</span>
                <Link to ={'/register'}>
                    <button className={styles.btn}>Sign Up</button>
                </Link>
            </div>
          </div>

          <div className={styles.formDiv}>
            <div className={styles.headerDiv}>
                    <img src={logo} alt="logo internbridge" />
                    <h3>Welcome Back!</h3>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                        <span className={styles.showMessage}>Login Status will go here</span>
                        <div className={styles.inputDiv}>
                    <label htmlFor="email">Email</label>
                    <div className={`${styles.input} flex`}>
                    <FaUserShield className={styles.icon} />
                    <input type="text"  name ="email" id='email' placeholder='Enter Your  Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    </div>

                    <div className={styles.inputDiv}>
                    <label htmlFor="password">Password</label>
                    <div className={`${styles.input} flex`}>
                    <BsShieldLockFill className={styles.icon} />
                    <input type="password" name="password" id='password' placeholder='Enter password' 
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    </div>

                    <button type='submit' className={`${styles.btn} flex`}>
                        <span>Sign In </span>
                        <GoPaperAirplane className={styles.icon} />
                    </button>

                    <span className={styles.forgotPassword}>
                        <p>Forgot Your Password? <a href="/forgot-password">Click here</a></p>
                    </span>
                </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
