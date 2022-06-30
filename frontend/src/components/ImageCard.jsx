import { Card, Container } from 'react-bootstrap';
import '../css/custom.scss';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';

const styles = {
  cardImage: {
    objectFit: 'cover',
    height: '50vh',
  },
};

const ImageCard = ({  image,  deleteImage,  saveImageToDb,}) => {
  const [saveBtn, setSaveBtn] = useState('')
  useEffect(() => {
    function imgCheck() {
      return image.check
    }
imgCheck()
  }, [setSaveBtn])

 
  return (
    <div>
      <Card>
        <Card.Img className="card-image" src={image.urls.small} />
        <Card.Body className="card-img-overlay d-flex align-items-end">
          <Container>
            <Card.Title className="image-card-text">
              {image.title?.toUpperCase()}
            </Card.Title>
            <Card.Text className="image-card-text">
              {image.description || image.alt_description}
            </Card.Text>

            <LoadingButton
              className="btn btn-primary"
              onClick={() => deleteImage(image.id)}
            >
              Delete
            </LoadingButton>

            <LoadingButton
              onClick={() => {
                saveImageToDb(image.id);
                setSaveBtn(image.check)
              }}
            >
              {image.check}
            </LoadingButton>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ImageCard;
