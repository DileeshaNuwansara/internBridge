import React, { useState } from 'react';
import styles from './Signin.module.scss';
import '../../App.scss';
import { GoPaperAirplane } from "react-icons/go";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import {Link} from 'react-router-dom'
import video from '../../assets/videos/sigin.mp4';
import logo from '../../assets/imgs/internbridge_logo.png';

const Signin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
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

                <form className={styles.form}>
                        <span className={styles.showMessage}>Login Status will go here</span>
                        <div className={styles.inputDiv}>
                    <label htmlFor="username">Username </label>
                    <div className={`${styles.input} flex`}>
                    <FaUserShield className={styles.icon} />
                    <input type="text" className="text" id='username' placeholder='Enter Username'
                    value={formData.username}
                    onChange={handleChange}
                    />
                    </div>
                    </div>

                    <div className={styles.inputDiv}>
                    <label htmlFor="password">Password</label>
                    <div className={`${styles.input} flex`}>
                    <BsShieldLockFill className={styles.icon} />
                    <input type="password" className="text" id='password' placeholder='Enter password' 
                    value={formData.password}
                    onChange={handleChange}
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
