import React, { useEffect } from 'react';
import Data from './Main';
import styles from './Landing.module.scss'; 
import { MdInterpreterMode } from "react-icons/md";
import { FaHistory, FaComments } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Activities() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className={styles.Activity}>
      <section className={`${styles.main} ${styles.container} section`}>
        <div className={styles.secTitle}>
          <h3 data-aos="fade-right" className={styles.title}>Most Recent Activities</h3>
        </div>
        <div className={styles.Content}>
          {Data.map(({ id, imgSrc, name, type, time, date, description }) => (
            <div key={id} className={styles.interviewOne}>
              <div className={styles.imageDiv}>
                <img src={imgSrc} alt="interview" />
              </div>
              <div className={styles.cardDetails}>
                <h4 className={styles.name}>{name}</h4>
                <span className={`${styles.contentDiv} flex`}>
                  <MdInterpreterMode />
                  <span className={styles.typeSes}>{type}</span>
                </span>
                <div className={`${styles.timeDiv} flex`}>
                  <FaHistory size={18} /> Time :
                  <span>{time}</span>
                </div>
                <div className={`${styles.dateDiv} flex`}>
                  <MdDateRange size={18} /> Date :
                  <span>{date}</span>
                </div>
                <div className={`${styles.desc} flex`}>
                  <p>{description}</p>
                </div>
                <button className={`${styles.btn} flex`}>
                  <FaComments size={24} className={styles.icon} /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Activities;
