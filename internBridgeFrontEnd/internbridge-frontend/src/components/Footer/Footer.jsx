import React,{useEffect} from 'react'
import { FiSend } from 'react-icons/fi';
import './footer.scss';
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
    <section className='footer'>
      
        <div className="secContent container">
          <div  className="contactDiv flex">
            <div data-aos="fade-up"  className="text">
              <small>Keep In Touch {currentYear}</small>
              <h2>Connect with Us</h2>
            </div>

            <div className="inputDiv flex">
              <input data-aos="fade-up" type="text" placeholder='Enter Email Address' />
              <button data-aos="fade-up" className="btn flex" type="submit" >SEND <FiSend className="icon"/></button>
            </div>
          </div>

          <div className="footerCard flex">
            <div className="footerIntro flex">
              <div className="logoDiv">
                <a href="/home" className="logo flex">
                  <div className="icon">
                  <img 
                    src={logo} 
                    alt="InternBridge logo" 
                    style={{ width: '140px', height: '60px' }}
                    className="d-inline-block align-top me-3"
                    />
                  </div>
                </a>
        
              </div>

              <div data-aos="fade-up" className='footerParagraph'>
              "InternBridge connects ambitious Computer Science students with IT industry leaders, providing a platform for students
               to discover valuable internship opportunities and for companies to find talented individuals ready to innovate and grow."
              </div>

              <div data-aos="fade-up" className="footerSocials">
              <SlSocialYoutube className='icon'/>
              <TiSocialLinkedin  className='icon'/>
              <SlSocialFacebook  className='icon'/>

              </div>

            </div>

            <div className='footerLinks grid'>
              <div className="linkGroup">
                <span className="groupTitle">Our Intern Bridge</span>
                <ul>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Students
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Admin
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                IT Companies
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Our Past Students
                </li>
                </ul>

              </div>

              <div className="linkGroup">
                <span className="groupTitle">Computer Science Society</span>
                <ul>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Annual Meetings
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                News
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Past Students
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Department
                </li>
              </ul>

              </div>

              <div className="linkGroup">
                <span className="groupTitle">Supportive Companies</span>
                <ul>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Annual Meetings
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                News
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Internship Offers
                </li>
                <li className="footerList flex">
                <FiChevronRight className='icon'/>
                Students
                </li>
              </ul>

              </div>


            </div>

            <div className="footerDiv flex">
             
              <small>COPYIGHT RESERVED--2024</small>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Footer;
