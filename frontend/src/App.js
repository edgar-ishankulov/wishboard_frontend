import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'; // getting API url from HTTP environment
const App = () => {
  const [word, setWord] = useState(''); // using the useState hook for controlled variable "word", function that changes it "setWord", default value of ''
  const [images, setImages] = useState([]); // using the useState hook for controlled variable "word", function that changes it "setWord", default value of empty array

  const handleSearchSubmit = (event) => {
    //declaring a function with a parameter
    event.preventDefault(); // preventing default behavior of http that reloads the page

    fetch(`${API_URL}/new-image?query=${word}`) // sending a fetch request to the server and passing parameters to it
      .then((res) => res.json()) // get promise in respose and convert it into json which returns another promise
      .then((data) => {
        // get the resolved promise response as json data
        setImages([{ ...data, title: word }, ...images]); //run the setImages function; add title key with value of word to the received data; add the rest of the images to the array;
      })
      .catch((err) => {
        // catch the error
        console.log(err);
      });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery 2" version="1.0.0" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
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

export default App;
