import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button, Box } from '@mui/material';

const Search = ({ handleSubmit, word, setWord }) => {
  return (
    <Container className="">
      <Row className="justify-content-center">
        <Col className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-10 justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Container className="d-flex container-fluid">
              <Form.Control
                type="text"
                value={word}
                onChange={(event) => setWord(event.target.value)}
                placeholder="Search for new images"
              />
              <Box alignSelf={'center'} ml={'1rem'}>
                <Button variant="contained" size="small" type="submit">
                  Search
                </Button>
              </Box>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
