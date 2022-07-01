import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Search = ({ handleSubmit, word, setWord }) => {
  return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    value={word}
                    onChange={(event) => setWord(event.target.value)}
                    placeholder="Search for new images"
                  />
                </Col>
                <Col xs={3} className="d-flex">
                  <Box mx={1} alignSelf={'center'}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        margin: 'normal',
                      }}
                      type="submit"
                    >
                      Search
                    </Button>
                  </Box>
                  <Box mx={1} alignSelf={'center'}>
                     <Link to="/wishboard">
                      <Button
                        sx={{ whiteSpace: 'nowrap' }}
                        variant="contained"
                        size="small"
                        type="button"
                      >
                        My Wishboard
                      </Button>
                      </Link>
                  </Box>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        
      </Container>
 
  );
};

export default Search;
