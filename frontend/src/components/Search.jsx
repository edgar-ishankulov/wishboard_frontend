import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setWord } from '../redux/wordSlice';
import SearchIcon from '@mui/icons-material/Search';
import '../css/custom.css'

const Search = ({ handleSubmit }) => {
  const word = useSelector((state) => state.setWord.word);
  const dispatch = useDispatch();

  return (
    <Container className='mt-sm-5'>
      <Row>
        <Col className='col-md-2 col-sm-12'></Col>
        <Col className="col-md-6 ps-md-5 col-sm-10 m-sm-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              value={word}
              onChange={(event) => dispatch(setWord(event.target.value))}
              placeholder="Search for new images"
            />
          </Form>
        </Col>
        <Col className="d-flex col-md-4 col-sm-12 justify-content-center justify-content-md-start mt-sm-4 mt-md-0">
          <Button
          onClick={handleSubmit}
            startIcon={<SearchIcon />}
            variant="contained"
            size="medium"
            type="submit"
            sx={{ fontSize: '13px', display: 'flex' }}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
