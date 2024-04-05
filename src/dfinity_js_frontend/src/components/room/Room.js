import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge } from "react-bootstrap";
import UpdateRoom from "./UpdateRoom"; // Import the UpdateRoom component

const Room = ({ room, getRooms }) => {

    const { id, house_id, room_number, is_booked,  capacity, price_per_night } = room;


  return (
    <Col>
      <Card>
        <Card.Header>
          <Badge bg="secondary">{id}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Title>House Id: {house_id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Room No: {room_number}</Card.Subtitle>
          <Card.Text>is Booked: {is_booked.toString()}</Card.Text>
          <Card.Text>Capacity: {capacity}</Card.Text>
          <Card.Text>Price: {price_per_night} ICP</Card.Text>

          <UpdateRoom id={id} getRooms={getRooms} />
        </Card.Body>
      </Card>
    </Col>
  );
};


export default Room;
