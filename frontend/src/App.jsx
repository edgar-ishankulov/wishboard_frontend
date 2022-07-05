import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import useToken from './components/UseToken'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const { token, removeToken, setToken } = useToken();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      res.data.check = 'false';
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (err) {
      console.log(err);
    }

    setWord('');
  };
  const handleDeleteImage = (id) => {
  
    setImages(images.filter((image) => image.id !== id));
  };

  async function handleSaveImageToDb(id) {
    const image = images.filter((image) => image.id === id);
    const sepImage = image[0];
    sepImage.check = 'true';
    await axios.post(savedImgInDbEndpoint, sepImage);
    setImages([...images]);
  }

  return (
    <div>
      <Header removeToken={removeToken} token={token} setToken={setToken} title="Images Gallery 2" version="1.0.0" />
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
                  setWord={setWord}
                  token={token}
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
