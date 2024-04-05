import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddHouse = ({ save }) => {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  

  const isFormFilled = () => name && address && description;

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
            <FloatingLabel controlId="name" label="Name">
              <Form.Control
                type="text"
                placeholder="Enter house name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="address" label="Address">
              <Form.Control
                type="text"
                placeholder="Enter house address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="description" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Enter house description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                address,
                description,
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
