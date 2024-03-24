import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateReservation = ({ reservation, save }) => {
  const [checkInDate, setCheckInDate] = useState(reservation.check_in_date);
  const [checkOutDate, setCheckOutDate] = useState(reservation.check_out_date);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => checkInDate && checkOutDate;

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill btn btn-outline-secondary"
      >
        Update Reservation <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Reservation</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputCheckInDate" label="Check-In Date" className="mb-3">
              <Form.Control
                type="text" // Assuming checkInDate is a string
                placeholder="Check-In Date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputCheckOutDate" label="Check-Out Date" className="mb-3">
              <Form.Control
                type="text" // Assuming checkOutDate is a string
                placeholder="Check-Out Date"
                value={checkOutDate}
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
                ...reservation,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
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

UpdateReservation.propTypes = {
  reservation: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
};

export default UpdateReservation;
