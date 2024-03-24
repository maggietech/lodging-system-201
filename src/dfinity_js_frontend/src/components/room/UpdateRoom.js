import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateRoom = ({ room, save }) => {
  const [roomNumber, setRoomNumber] = useState(room.room_number);
  const [isBooked, setIsBooked] = useState(room.is_booked);
  const [price, setPrice] = useState(room.price);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => roomNumber && price;

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill btn btn-outline-secondary"
      >
        Update Room <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Room</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputRoomNumber" label="Room Number" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </FloatingLabel>
            <Form.Check
              type="checkbox"
              id="isBookedCheckbox"
              label="Is Booked"
              checked={isBooked}
              onChange={(e) => setIsBooked(e.target.checked)}
              className="mb-3"
            />
            <FloatingLabel controlId="inputPrice" label="Price" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                ...room,
                room_number: roomNumber,
                is_booked: isBooked,
                price: price,
              });
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateRoom.propTypes = {
  room: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
};

export default UpdateRoom;
