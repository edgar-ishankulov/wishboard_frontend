import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import useToken from './components/UseToken';
import { useSelector, useDispatch } from 'react-redux';
import { setWord } from './redux/wordSlice';
import { alreadySaved } from './redux/alreadySavedSlice';
import { Alert, Icon } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const App = () => {
  const dispatch = useDispatch();
  const word = useSelector((state) => state.setWord.word);
  const alreadySavedState = useSelector(
    (state) => state.alreadySaved.alreadySaved
  );
  const [badQuery, setBadQuery] = useState(false);

  useEffect(() => {
    function handleBadQuery() {
      return;
    }
    handleBadQuery();
  }, [badQuery]);

  const [images, setImages] = useState([]);

  const { token, removeToken, setToken } = useToken();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      res.data.check = 'false';
      setImages([...res.data]);
      setBadQuery(false);
    } catch (error) {
      if (error.response.status == 400) {
        setBadQuery(true);
      }
    }
    dispatch(setWord(''));
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };
  
  async function handleSaveImageToDb(id) {
    try {
      const image = images.filter((image) => image.id === id);
      const sepImage = image[0];
      sepImage.check = 'true';
      const res = await axios({
        method: 'POST',
        url: savedImgInDbEndpoint,
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: sepImage,
      });
      if (res.data == 'True') {
        dispatch(alreadySaved(true));
      }
      setImages([...images]);
    }
    catch (error) {
console.log(error.response)
    }
    }

  return (
    <div>
      <Header
        removeToken={removeToken}
        token={token}
        setToken={setToken}
        title="Images Gallery 2"
        version="1.0.0"
      />
      <Search
        // word={word} setWord={setWord}
        handleSubmit={handleSearchSubmit}
      />
        {badQuery? <Alert sx={{display: 'flex', justifyContent: 'center', mt:"3rem" }} severity="error" >We couldn't find anything. Please modify your search query and try again.</Alert> : ''}
      <Container className="mt-5">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-4">
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                  saveImageToDb={handleSaveImageToDb}
                  // setWord={setWord}
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
