import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Button } from "react-bootstrap";
import UpdateReservation from "./UpdateReservation"; 
const Reservation = ({ reservation, getReservations }) => {

  const { id, house_id, room_id, guest_id, check_in_date, check_out_date } = reservation;


  return (
    <Col>
      <Card>
        <Card.Header>
          <h5>Reservation ID: {id}</h5>
        </Card.Header>
        <Card.Body>
          <Card.Title>House ID: {house_id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Room ID: {room_id}</Card.Subtitle>
          <Card.Text>Guest ID: {guest_id}</Card.Text>
          <Card.Text>Check-in Date: {check_in_date}</Card.Text>
          <Card.Text>Check-out Date: {check_out_date}</Card.Text>
          <UpdateReservation id={id} getReservations={getReservations} />
        </Card.Body>
      </Card>
    </Col>
  );
};



export default Reservation;
