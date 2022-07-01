import { Card, Container } from 'react-bootstrap';
import '../css/custom.scss';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';

const ImageCard = ({ image, deleteImage, saveImageToDb }) => {
  const [saveBtn, setSaveBtn] = useState(image.check);
  useEffect(() => {
    function imgCheck() {
      return setSaveBtn(image.check);
    }
    imgCheck();
  }, [setSaveBtn]);

console.log(image.check)
  return (
    <div>
      <Card>
        <Card.Img className="card-image d-flex" src={image.urls.small} />
        <Card.Body className="card-img-overlay d-flex align-items-end">
          <Container>
            <Card.Title className="image-card-text">
              {image.title?.toUpperCase()}
            </Card.Title>
            <Card.Text className="image-card-text">
              {image.description || image.alt_description}
            </Card.Text>

            <LoadingButton
              variant='contained'
              sx={{mr: 2}}
              size="small"
              onClick={() => deleteImage(image.id)}
            >
              Delete
            </LoadingButton>

            <LoadingButton
              onClick={() => {
                saveImageToDb(image.id);
                setSaveBtn(image.check);
              }}
              size="small"
              disabled={image.check == "true" ? true : false}
              variant='contained'
              >
              {image.check == "true"? "Saved" : "Save"}
            </LoadingButton>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ImageCard;
