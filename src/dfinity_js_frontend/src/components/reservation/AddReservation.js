import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddReservation = ({ save }) => {
  const [roomId, setRoomId] = useState("");
  const [guestId, setGuestId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const isFormFilled = () => roomId && guestId && checkInDate && checkOutDate;

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
            <FloatingLabel controlId="inputRoomId" label="Room ID" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Room ID"
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputGuestId" label="Guest ID" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Guest ID"
                onChange={(e) => {
                  setGuestId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCheckInDate"
              label="Check-in Date"
              className="mb-3"
            >
              <Form.Control
                type="text" // Assuming checkInDate is a string
                placeholder="Check-in Date"
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCheckOutDate"
              label="Check-out Date"
              className="mb-3"
            >
              <Form.Control
                type="text" // Assuming checkOutDate is a string
                placeholder="Check-out Date"
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                }}
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
                room_id: roomId,
                guest_id: guestId,
                check_in_date: checkInDate, // Assuming checkInDate is a string
                check_out_date: checkOutDate, // Assuming checkOutDate is a string
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

AddReservation.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddReservation;
