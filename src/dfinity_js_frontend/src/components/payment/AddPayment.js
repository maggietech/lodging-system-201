import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddPayment = ({ save }) => {
  const [reservationId, setReservationId] = useState("");
  const [amount, setAmount] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const isFormFilled = () => reservationId && amount && createdDate;

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
          <Modal.Title>New Payment</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputReservationId" label="Reservation ID" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Reservation ID"
                onChange={(e) => {
                  setReservationId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputAmount" label="Amount" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
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
                reservation_id: reservationId,
                amount,
                created_date: createdDate, // Assuming createdDate is a string
              });
              handleClose();
            }}
          >
            Save payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddPayment.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddPayment;
