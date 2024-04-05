import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import UpdateGuest from "./UpdateGuest"; 
const Guest = ({ guest, getGuests }) => {

  const { id, name, email, phone} = guest;



  return (
    <Col>
      <Card>
        <Card.Header>
          <h5>Guest ID: {id}</h5>
        </Card.Header>
        <Card.Body>
          <Card.Title>Name: {name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Email: {email}</Card.Subtitle>
          <Card.Text>Phone: {phone}</Card.Text>
          <UpdateGuest id={id} getGuests={getGuests} />
        </Card.Body>
      </Card>
    </Col>
  );
};



export default Guest;
