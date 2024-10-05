import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './Card.module.scss';

const Cards = ({ title, description, link, imgs }) => {
    const navigate = useNavigate();
    
    const navigateToa = () => {
        navigate(link);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imgs} />
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
