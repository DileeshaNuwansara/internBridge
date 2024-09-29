import React, { useState } from 'react';
import './Signin.scss';
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
      <div className="signinPage flex">
        <div className="container flex">
            <div className="videoDiv">
                <video src={video} autoPlay muted loop></video>
            
            <div className="textDiv">
                <h2 className="title">Create An Account </h2>
                <p>Adopt to industrial experience</p>
            </div>

            <div className="footerDiv flex">
                <span className="text">Don't have an account?</span>
                <Link to ={'/register'}>
                    <button className="btn">Sign Up</button>
                </Link>
            </div>
            </div>

            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo} alt="logo internbridge" />
                    <h3>Welcome Back!</h3>
                </div>

                <form action="" className="form grid">
                    <span>Login Status will go here</span>
                    <div className="inputDiv">
                    <label htmlFor="username">Username </label>
                    <div className="input flex">
                    <FaUserShield className='icon'/>
                    <input type="text" className="text" id='username' placeholder='Enter Username'
                    value={formData.password}
                    onChange={handleChange}
                    />
                    </div>
                    </div>

                    <div className="inputDiv">
                    <label htmlFor="password">Password</label>
                    <div className="input flex">
                    <BsShieldLockFill className='icon'/>
                    <input type="password" className="text" id='password' placeholder='Enter password' 
                    value={formData.password}
                    onChange={handleChange}
                    />
                    </div>
                    </div>

                    <button type='submit' className='btn flex'>
                        <span>Sign In </span>
                        <GoPaperAirplane  className='icon'/>

                    </button>

                    <span className='forgotPassword'>
                        Forgot Your Password? <a href="">Click here</a>
                    </span>


                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Signin
