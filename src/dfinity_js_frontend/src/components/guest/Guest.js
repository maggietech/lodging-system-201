import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import UpdateGuest from "./UpdateGuest"; 
const Guest = ({ guest, update }) => {
  const { id, name, created_date } = guest;

  const triggerUpdate = () => {
    update(id);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-secondary">
            <span>Created: {new Date(created_date).toLocaleDateString()}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={triggerUpdate} className="w-100 py-3">
          <UpdateGuest guest={guest} save={update} />
            Update
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Guest.propTypes = {
  guest: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.func.isRequired,
};

export default Guest;
