import React,{useEffect} from 'react'
import { FiSend } from 'react-icons/fi';
import styles from  './footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/internbridge_logo.png';
import { FiChevronRight } from "react-icons/fi";
import { SlSocialYoutube } from "react-icons/sl";
import {TiSocialLinkedin} from "react-icons/ti";
import { SlSocialFacebook } from "react-icons/sl";
import {FaFacebook,FaLinkedin,FaYoutubeSquare} from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import smallLogo from '../../assets/imgs/smallLogo.png';

const Footer = () => {

  //scrool animation
  useEffect(()=>{
    AOS.init({duration:2000})
  },[])

    const currentYear = new Date().getFullYear();

  return (
    <section className={styles.footer}>
      
        <div className={`${styles.secContent} container`}>
        <div className={`${styles.contactDiv} flex`}>
        <div data-aos="fade-up" className={styles.text}>
              <small>Keep In Touch {currentYear}</small>
              <h2>Connect with Us</h2>
            </div>

            <div className={`${styles.inputDiv} flex`}>
              <input data-aos="fade-up" type="text" placeholder='Enter Email Address' />
              <button data-aos="fade-up" className={`${styles.btn} flex`} type="submit" >
                SEND <FiSend className={styles.icon} /></button>
            </div>
          </div>

          <div className={styles.footerCard}>
          <div className={styles.footerIntro}>
            <div className={styles.logoDiv}>
              <a href="/home" className={`${styles.logo} flex`}>
                <img
                  src={logo}
                  alt="InternBridge logo"
                  style={{ width: '140px', height: '60px' }}
                  className="d-inline-block align-top me-3"
                />
              </a>
            </div>

              <div data-aos="fade-up" className={styles.footerParagraph}>
              "InternBridge connects ambitious Computer Science students with IT industry leaders, providing a platform for students
               to discover valuable internship opportunities and for companies to find talented individuals ready to innovate and grow."
              </div>

              <div data-aos="fade-up" className={styles.footerSocials}>
              <SlSocialYoutube className={styles.icon} />
              <TiSocialLinkedin className={styles.icon} />
              <SlSocialFacebook className={styles.icon} />
              </div>

            </div>

            <div className={styles.footerLinks}>
              <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Our Intern Bridge</span>
                <ul>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Students
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Admin
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                IT Companies
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Our Past Students
                </li>
                </ul>

              </div>

              <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Computer Science Society</span>
                <ul>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Annual Meetings
                </li>
                <li className={`${styles.footerList} flex`}>
               <FiChevronRight className={styles.icon} />
                News
                </li>
                <li className={`${styles.footerList} flex`}>
               <FiChevronRight className={styles.icon} />
                Past Students
                </li>
                <li className={`${styles.footerList} flex`}>
               <FiChevronRight className={styles.icon} />
                Department
                </li>
              </ul>

              </div>

              <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Supportive Companies</span>
                <ul>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Annual Meetings
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                News
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Internship Offers
                </li>
                <li className={`${styles.footerList} flex`}>
                <FiChevronRight className={styles.icon} />
                Students
                </li>
              </ul>

              </div>


            </div>

           
          </div>

          <div>
            <div className={styles.footerDiv1}>
              <div className="row container py-4 ">
            <div className="col-12 col-md-6">
              <img src={smallLogo} alt="InternBridge Logo" className={styles.logo} />
            </div>
            <div className="col-12 col-md-6 text-md-right ">
              <ul className="list-inline d-flex my-3 mr-3 justify-content-end">
                <li className="list-inline-item mr-4 mx-6">
                  <Link to="/about-us" className="text-white">About Us</Link>
                </li>
                <li className="list-inline-item mr-4 mx-8">
                  <Link to="/contactus" className="text-white mr-4">Contact Us</Link>
                </li>
                <li className="list-inline-item mr-4">
                  <a href="https://facebook.com" className="text-white" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebook  />
                  </a>
                </li>
              
          
                <li className="list-inline-item">
                  <a href="https://linkedin.com" className="text-white" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin  />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://youtube.com" className="text-white" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                    <FaYoutubeSquare  />
                  </a>
                </li>
              </ul>
            </div>
                </div>
                
            </div>

            <div className={styles.footerDiv}>
              
                <small>COPYIGHT RESERVED--2024</small>
            </div>
          </div>



        </div>
    </section>
  )
}

export default Footer;
