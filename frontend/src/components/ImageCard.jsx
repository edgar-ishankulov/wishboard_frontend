import React from 'react';
import { Card, Container } from 'react-bootstrap';
import "../css/custom.scss";

const styles = {
  cardImage: {
    objectFit: 'cover',
    height: '50vh'
  }
}

const ImageCard = ({ image, deleteImage }) => {
  return (
    <div>
    <Card>
      <Card.Img  className="card-image" src={image.urls.small} />
      <Card.Body className='card-img-overlay d-flex align-items-end'>
        <Container>
        <Card.Title>{image.title.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <button className='btn btn-primary' onClick={() => deleteImage(image.id)}>
          Delete
        </button>
        </Container>
      </Card.Body>
    </Card>
    
      </div>
     
  );
};

export default ImageCard;
