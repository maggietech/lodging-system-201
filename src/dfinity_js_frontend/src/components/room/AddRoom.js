import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddRoom = ({ save }) => {
  const [houseId, setHouseId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [price, setPrice] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const isFormFilled = () => houseId && roomNumber && price && createdDate;

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
          <Modal.Title>New Room</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputHouseId" label="House ID" className="mb-3">
              <Form.Control
                type="text"
                placeholder="House ID"
                onChange={(e) => {
                  setHouseId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputRoomNumber" label="Room Number" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Room Number"
                onChange={(e) => {
                  setRoomNumber(e.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Check
              type="checkbox"
              id="checkbox-is-booked"
              label="Is Booked"
              className="mb-3"
              onChange={(e) => {
                setIsBooked(e.target.checked);
              }}
            />
            <FloatingLabel controlId="inputPrice" label="Price" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCreatedDate"
              label="Created Date"
              className="mb-3"
            >
              <Form.Control
                type="text" // Assuming createdDate is a string
                placeholder="Created Date"
                onChange={(e) => {
                  setCreatedDate(e.target.value);
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
                house_id: houseId,
                room_number: roomNumber,
                is_booked: isBooked,
                price: price,
                created_date: createdDate, // Assuming createdDate is a string
              });
              handleClose();
            }}
          >
            Save room
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddRoom.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddRoom;
