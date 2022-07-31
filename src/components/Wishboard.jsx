import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ImageCard from './ImageCard';
import Welcome from './Welcome';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';
import { imgLengthCheck } from '../redux/imgLengthSlice';
import { CircularProgress, Alert, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const Wishboard = ({ token, setToken }) => {
  const dispatch = useDispatch();
  const imgLength = useSelector((state) => state.imgLengthCheck.length)
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  
  useEffect(() => {
    async function getSavedImages() {
      try {
        setIsLoading(true)
        const res = await axios({
          method: 'GET',
          url: `${API_URL}/images`,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setIsLoading(false)
        setImages(res.data[0].images.reverse() || []);
      } catch (error) {
        console.log(error);
      }
    }
    getSavedImages();
  }, []);

  const handleDeleteImage = (id) => {
    const removeImage = async () => {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `${API_URL}/images`,
          headers: {
            Authorization: 'Bearer ' + token,
          },
          data: { id: id },
        });
      } catch (error) {
        console.log(error);
      }
    };
    removeImage();
    setImages(images.filter((image) => image.id !== id));
  };

useEffect(() => {
const dispatchImagesLength = () => {
  dispatch(imgLengthCheck(images.length))
  
}
dispatchImagesLength()
}, [images ])



  return (
    <>
    {isLoading?
     <Container className='d-flex justify-content-center vh-30'>

     <CircularProgress /> 
     </Container>
     :
      <Container className="mt-5">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-4">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Container className="d-flex justify-content-center">
          <Alert variant="outlined" severity="info" sx={{ width: '60%' }}>
            Your Wishboard is empty.{' '}
            <strong>
              Please{' '}
              <Link
                to="/"
                style={{ textDecoration: 'none', color: 'none' }}
              >
                <Chip
                  label="Search"
                  icon={<SearchIcon />}
                  size="small"
                  href="#basic-chip"
                  variant="outlined"
                  clickable
                />
              </Link>{' '}
              for images and save them to your Wishboard
            </strong>
          </Alert>
        </Container>
          )}
      </Container>
        }
    </>
  );
};

export default Wishboard;
