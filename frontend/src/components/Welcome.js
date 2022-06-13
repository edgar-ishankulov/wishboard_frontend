import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container my-5 px-5 ">
      <h1 className="display-4 d-flex justify-content-center fs-2 fw-semibold">
        Images Gallery 2
      </h1>
      <p className="lead d-flex justify-content-center px-5 text-center">
        This is a simple application that retreives photos using Unsplash API
        according to the user search inputs.
      </p>
      <p className="d-flex justify-content-center">
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn More
        </Button>
      </p>
    </div>
  </div>
);
export default Welcome;
