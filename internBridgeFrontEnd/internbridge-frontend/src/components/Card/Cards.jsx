import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './Card.module.css';

const Cards = ({ title, description, link }) => {
    const navigate = useNavigate();
    
    const navigateToa = () => {
        navigate(link);
  };

  return (
    <Card style={{ width: '20rem' }}>
     <Card.Img variant="top" alt ="card image " src="../src/assets/imgs/cardimg.png"  style={{ width: '250px', height: '150px' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button 
          onClick={navigateToa}
          className={`btn ${styles.customButton}`}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
