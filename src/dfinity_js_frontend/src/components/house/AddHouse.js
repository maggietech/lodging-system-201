import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddHouse = ({ save }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const isFormFilled = () => name && owner && createdDate;

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
          <Modal.Title>New House</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputOwner" label="Owner" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Owner"
                onChange={(e) => {
                  setOwner(e.target.value);
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
                name,
                owner,
                created_date: createdDate, // Assuming createdDate is a string
              });
              handleClose();
            }}
          >
            Save house
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddHouse.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddHouse;
