import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Search = ({ handleSubmit, word, setWord }) => {
  return (
    <Box my="2rem">
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
                <Box>
                  <Box alignSelf={'center'}>
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
                  <Box my="0.5rem" alignSelf={'center'}>
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
                </Box>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Box>
  );
};

export default Search;
