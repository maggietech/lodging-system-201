import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateHouse = ({ house, save }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const isFormFilled = () => owner && createdDate;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="rounded-pill btn btn-outline-secondary"
      >
        Update House <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update House</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                defaultValue={house.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputOwner" label="Owner" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Owner"
                defaultValue={house.owner}
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
                defaultValue={house.created_date}
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
                id: house.id,
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

UpdateHouse.propTypes = {
  save: PropTypes.func.isRequired,
};

export default UpdateHouse;
