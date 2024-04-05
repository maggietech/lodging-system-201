import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddReservation = ({ save }) => {

  const [house_id, setHouseId] = useState("");
  const [room_id, setRoomId] = useState("");
  const [guest_id, setGuestId] = useState("");
  const [check_in_date, setCheckInDate] = useState("");
  const [check_out_date, setCheckOutDate] = useState("");

  const isFormFilled = () => house_id && room_id && guest_id && check_in_date && check_out_date;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill btn btn-outline-success"
      >
        New <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Reservation</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="house_id" label="House ID">
              <Form.Control
                type="text"
                placeholder="Enter house ID"
                value={house_id}
                onChange={(e) => setHouseId(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="room_id" label="Room ID">
              <Form.Control
                type="text"
                placeholder="Enter room ID"
                value={room_id}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="guest_id" label="Guest ID">
              <Form.Control
                type="text"
                placeholder="Enter guest ID"
                value={guest_id}
                onChange={(e) => setGuestId(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="check_in_date" label="Check-in Date">
              <Form.Control
                type="date"
                placeholder="Enter check-in date"
                value={check_in_date}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="check_out_date" label="Check-out Date">
              <Form.Control
                type="date"
                placeholder="Enter check-out date"
                value={check_out_date}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </FloatingLabel>

          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                house_id,
                room_id,
                guest_id,
                check_in_date,
                check_out_date,
              });
              handleClose();
            }}
          >
            Save reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



export default AddReservation;
