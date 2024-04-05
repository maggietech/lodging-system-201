import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { updateHouse } from "../../utils/houseService";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";


const UpdateHouse = ({ id, getHouses}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const update = async () => {
    try {
      setLoading(true);
      const housePayload = {
        name,
        address,
        description,
      };
      updateHouse(id,housePayload).then((resp) => {
        getHouses();
        toast(<NotificationSuccess text="House Updated successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to Update a house." />);
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled = () => name && address && description;

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
        Update House 
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update House</Modal.Title>
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
              update();
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



export default UpdateHouse;
