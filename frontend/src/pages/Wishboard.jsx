import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ImageCard from '../components/ImageCard';
import Welcome from '../components/Welcome';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';

import Header from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const Wishboard = ({ token, setToken }) => {
  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios({
          method: 'GET',
          url: `${API_URL}/images`,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log(res.data[0])
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
          method: "DELETE",
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
  return (
    <div>
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
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default Wishboard;
