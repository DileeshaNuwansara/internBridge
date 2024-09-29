import React, { useEffect } from 'react';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import styles from './Landing.module.scss'; // Import the CSS Module
import Footer from '../../components/Footer/Footer';
import Activities from './Activities';
import video from '../../assets/videos/video.mp4';
import { MdEmail } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { FaSortNumericDown } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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
              <div className={styles.companyInput}>
                <label htmlFor='company'>Enter Your Company</label>
                <div className={styles.input}>
                  <input type="text" placeholder='Your Company Name here..' />
                  <CgRename className={styles.icon} />
                </div>
              </div>
              <div className={styles.emailInput}>
                <label htmlFor='email'>Enter Company Email</label>
                <div className={styles.input}>
                  <input type="text" placeholder='Your Company Email here..' />
                  <MdEmail className={styles.icon} />
                </div>
              </div>
              <div className={styles.positionInput}>
                <label htmlFor='positions'> No. of Available Seats:  </label>
                <h4 className={styles.total}>45</h4>
                <div className={styles.input}>
                  <input type="range" max="25" min="1" />
                  <FaSortNumericDown className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Activities />
        </section>
        <br />
        <section>
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Landing;
