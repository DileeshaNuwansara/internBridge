import React,{useEffect} from 'react'
import { FiSend } from 'react-icons/fi';
import styles from  './footer.module.scss';
import logo from '../../assets/imgs/internbridge_logo.png';
import { FiChevronRight } from "react-icons/fi";
import { SlSocialYoutube } from "react-icons/sl";
import {TiSocialLinkedin} from "react-icons/ti";
import { SlSocialFacebook } from "react-icons/sl";
import AOS from 'aos';
import 'aos/dist/aos.css';


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

            <div className={styles.footerDiv}>
             
              <small>COPYIGHT RESERVED--2024</small>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Footer;
