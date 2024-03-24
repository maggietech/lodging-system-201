import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge } from "react-bootstrap";
import UpdateRoom from "./UpdateRoom"; // Import the UpdateRoom component

const Room = ({ room, update }) => {
  const { id, house_id, room_number, is_booked, price, created_date } = room;

  const triggerUpdate = () => {
    update(id);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Badge bg="secondary" className="me-2">
            {house_id}
          </Badge>
          <Badge bg={is_booked ? "danger" : "success"}>{is_booked ? "Booked" : "Available"}</Badge>
        </Card.Header>
        <Card.Body className="d-flex flex-column text-center">
          <Card.Title>{room_number}</Card.Title>
          <Card.Text className="text-secondary">Price: {price}</Card.Text>
          <Card.Text className="text-secondary">
            <span>Created: {new Date(created_date).toLocaleDateString()}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={triggerUpdate} className="w-100 py-3">
          <UpdateRoom room={room} save={update} />
            Update
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Room.propTypes = {
  room: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.func.isRequired,
};

export default Room;
