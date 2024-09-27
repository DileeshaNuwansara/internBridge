import React,{useEffect} from 'react'
import Data from './Main';
import './Landing.scss';
import { MdInterpreterMode } from "react-icons/md";
import { FaHistory, FaComments } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';


function Activities() {
   //scrool animation
   useEffect(()=>{
    AOS.init({duration:2000})
  },[])


  return (
    <>
    <section className='main container section'>
        <div className="secTitle">
            <h3 data-aos="fade-right" className="title">Most Recent Activities</h3>
        </div>

        <div className="Content grid">
            {/* list of object in one array */}
            {Data.map(({ id, imgSrc, name, type, time,date, description }) => (
            
            <div key={id} className='interviewOne'>
              <div className="imageDiv">
                <img src={imgSrc} alt="interview" />
              </div>
              <div className="cardDetails">
                <h4 className='name'>{name}</h4>
                <span className="contentDiv flex">
                  <MdInterpreterMode />
                  <span className='typeSes'>{type}</span>
                </span>

                <div className='timeDiv flex'>
                  <FaHistory size={18} /> Time :
                  <span>{time}</span>
                </div>
                <div className='dateDiv flex'>
                  <MdDateRange size={18}/> Date :
                  <span>{date}</span>
                </div>

                <div className="desc flex">
                  <p>{description}</p>
                </div>
                <button className="btn flex">
                  <FaComments size={24} className="icon" />  Details
                </button>

              </div>
            </div>
            


            ))}

            
        </div>  
    </section>
    </>
  );
}

export default Activities;