import React,{useEffect} from 'react';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import './Landing.scss';
import Footer from '../../components/Footer/Footer';
import Activities from './Activities';
import video from '../../assets/videos/video.mp4';
import { MdEmail } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { FaSortNumericDown } from "react-icons/fa";

import AOS from 'aos';
import 'aos/dist/aos.css';
const Landing = () => {

  //scrool animation
  useEffect(()=>{
    AOS.init({duration:2000})
  },[])
  return (
    <>
       <LandingPageNavbar/> 
      <section className='body'>
        <div className="overlay"></div> 
        
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        
        <div className="homeContent container">
          <div className="textDiv">
            <span data-aos="fade-up" className="smallText">
              Our InternBridge Web Portal connects us 
            </span>

            <h1  data-aos="fade-up" className="homeTitle">
              Give Your Offerings To Our Students
            </h1>
          </div>
          <br/>

          <div  data-aos="fade-up" className="cardDiv grid">
            <div className="companyInput">
              <label htmlFor='company'>Enter Your Company</label>
              <div className="input flex">
                <input type="text" placeholder='Your Company Name here..' />
                <CgRename className='icon'/>
              </div>
            </div>

            <div className="emailInput">
              <label htmlFor='email'>Enter Company Email</label>
              <div className="input flex">
                <input type="text" placeholder='Your Company Email here..' />
                <MdEmail className='icon'/>
              </div>
            </div>

            <div className="positionInput">
              <label htmlFor='positions'> No. of Available Seats:  </label>
              <h4 className="total">45</h4>
              <div className="input flex">
                <input type="range" max="25" min="1" />
                <FaSortNumericDown className='icon'/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
        <Activities/>
        </section>
        <br/>
        <section>
        <Footer/>
        </section>
     
    </>
  );
}

export default Landing;