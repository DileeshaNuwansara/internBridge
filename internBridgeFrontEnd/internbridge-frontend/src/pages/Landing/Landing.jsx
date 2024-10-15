import React, { useState,useEffect } from 'react';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import styles from './Landing.module.scss'; // Import the CSS Module
import Footer from '../../components/Footer/Footer';
import Activities from './Activities';
import video from '../../assets/videos/video.mp4';
import { MdEmail } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { FaSortNumericDown } from "react-icons/fa";
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import { FiSend } from 'react-icons/fi';


const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [availablePositions, setAvailablePositions] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      company,
      email,
      availablePositions
    };
    try {
      const response = await axios.post('http://localhost:8081/api/internships', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

    const handleRangeChange = (e) => {
      setAvailablePositions(e.target.value);
    };

  return (
    <>
      <LandingPageNavbar />
      <div className={styles.landingPage}>
        <section className={styles.body}>
          <div className={styles.overlay}></div>
          <video src={video} muted autoPlay loop type="video/mp4"></video>
          <div className={styles.homeContent}>
            <div className={styles.textDiv}>
              <span data-aos="fade-up" className={styles.smallText}>
                Our InternBridge Web Portal connects us 
              </span>
              <h1 data-aos="fade-up" className={styles.homeTitle}>
                Give Your Offerings To Our Students
              </h1>
            </div>
            <br />
            <div data-aos="fade-up" className={styles.cardDiv}>
              <form onSubmit={handleSubmit}> 
                <div className={styles.companyInput}>
                  <label htmlFor='company'>Enter Your Company</label>
                  <div className={styles.input}>
                    <input type="text" name='company' placeholder='Your Company Name here..' value={company}  onChange={(e) => setCompany(e.target.value)}
                    required
                    />
                  <CgRename className={styles.icon} />
                </div>
                </div>
                <div className={styles.emailInput}>
                  <label htmlFor='email'>Enter Contact Email</label>
                  <div className={styles.input}>
                  <input type="text" name='email' placeholder='Your Company Email here..' value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
                  <MdEmail className={styles.icon} />
                  </div>
                </div>
                <div className={styles.positionInput}>
                <label htmlFor='positions'> No. of Available Seats:  </label>
                <h4 className={styles.total}>{availablePositions}</h4>
                <div className={styles.input}>
                <input
                type="range"
                name='availablepositions'
                max="25"
                min="1"
                value={availablePositions}
                onChange={handleRangeChange}
              />
              
                  <FaSortNumericDown className={styles.icon} />
                </div>
                <div>
                <button data-aos="fade-up" className={`${styles.btnicon} flex`} type="submit" >
                SEND <FiSend className={styles.icon} /></button>
                </div>
                </div>
              
              </form>
            </div>
          </div>
        </section>
        <section>
          <Activities />
        </section>
        <br />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Landing;
