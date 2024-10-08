import React, { useState } from 'react';
import styles from './Signin.module.scss';
import '../../App.scss';
import { GoPaperAirplane } from "react-icons/go";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import {Link} from 'react-router-dom'
import video from '../../assets/videos/sigin.mp4';
import logo from '../../assets/imgs/internbridge_logo.png';
import axios from 'axios';
const Signin = () => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '' });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:8080/api/v1/user/login', formData);
        if (response.data.success) {
          alert('Login Successful');

        } else {
          alert('Login Failed: ' + response.data.message);
      }
  } catch (error) {
      console.error('Error during login:', error.response.data);
      alert('Error during login: ' + error.response.data);
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
                        Forgot Your Password? <a href="/">Click here</a>
                    </span>
                </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signin
