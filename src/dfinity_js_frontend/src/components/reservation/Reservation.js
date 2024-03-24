import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Button } from "react-bootstrap";
import UpdateReservation from "./UpdateReservation"; 
const Reservation = ({ reservation, update }) => {
  const { id, room_id, guest_id, check_in_date, check_out_date, created_date } = reservation;

  const triggerUpdate = () => {
    // Handle update action here
    update(id);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Badge bg="secondary" className="me-2">
            {room_id}
          </Badge>
          <Badge bg="info">{guest_id}</Badge>
        </Card.Header>
        <Card.Body className="d-flex flex-column text-center">
          <Card.Text className="text-secondary">
            Check-in: {new Date(check_in_date).toLocaleDateString()}
          </Card.Text>
          <Card.Text className="text-secondary">
            Check-out: {new Date(check_out_date).toLocaleDateString()}
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>Created: {new Date(created_date).toLocaleDateString()}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={triggerUpdate} className="w-100 py-3">
          <UpdateReservation reservation={reservation} save={update} />
            Update
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Reservation.propTypes = {
  reservation: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.func.isRequired,
};

export default Reservation;
