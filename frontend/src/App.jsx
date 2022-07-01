import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [dbBtn, setDbBtn] = useState('');

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(savedImgInDbEndpoint);
        setImages(res.data.reverse() || []);
      } catch (error) {
        console.log(error);
      }
    }
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      res.data.check='false'
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (err) {
      console.log(err);
    }

    setWord('');
  };
  const handleDeleteImage = (id) => {
    const removeImage = async () => {
      try {
        const res = await axios.delete(`${API_URL}/images`, { data: { "id": id } });
      } catch (error) {
        console.log(error);
      }
    };
    removeImage();
    setImages(images.filter((image) => image.id !== id));
  };

  async function handleSaveImageToDb(id) {
    const image = images.filter((image) => image.id === id);
    const sepImage = image[0];
    sepImage.check = "true"
    await axios.post(savedImgInDbEndpoint, sepImage);
    setImages([...images])
  }

  return (
    <div>
      <Header title="Images Gallery 2" version="1.0.0" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-5">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-4">
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                  saveImageToDb={handleSaveImageToDb}
                  dbBtn={dbBtn}
                  setWord={setWord}
                />
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

export default App;
