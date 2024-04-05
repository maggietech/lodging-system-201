import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { updateRoom } from "../../utils/roomService";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";


const UpdateRoom = ({ id, getRooms }) => {
  const [house_id, setHouseId] = useState("");
  const [room_number, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price_per_night, setPricePerNight] = useState("");

  const isFormFilled = () => house_id && room_number && capacity && price_per_night;

  const update = async () => {
    try {
      setLoading(true);
      const roomPayload = {
        house_id,
        room_number,
        capacity,
        price_per_night,
      };
      
      updateRoom(id,roomPayload).then((resp) => {
        getRooms();
        toast(<NotificationSuccess text="House Updated successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to Update a house." />);
    } finally {
      setLoading(false);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill btn btn-outline-secondary"
      >
        Update Room 
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Room</Modal.Title>
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
            <FloatingLabel controlId="room_number" label="Room Number">
              <Form.Control
                type="text"
                placeholder="Enter room number"
                value={room_number}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="capacity" label="Capacity">
              <Form.Control
                type="text"
                placeholder="Enter room capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="price_per_night" label="Price per night">
              <Form.Control
                type="text"
                placeholder="Enter price per night"
                value={price_per_night}
                onChange={(e) => setPricePerNight(e.target.value)}
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default UpdateRoom;
