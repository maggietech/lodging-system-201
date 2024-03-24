import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddRoom from "./AddRoom";
import Room from "./Room";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getRoomDetails as getRoomList,
  registerRoom,
  updateRoom
} from "../../utils/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of rooms
  const getRoomDetails = useCallback(async () => {
    try {
      setLoading(true);
      setRooms(await getRoomList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to add a room
  const addRoom = async (data) => {
    try {
      setLoading(true);
      const idStr = data.id;
      data.id = parseInt(idStr, 10);
      registerRoom(data).then((resp) => {
        getRoomDetails();
      });
      toast(<NotificationSuccess text="Room added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to register a room." />);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a room
  const update = async (data) => {
    try {
      setLoading(true);
      data.id = parseInt(data.id, 10);
      updateRoom(data).then((resp) => {
        getRoomDetails();
        toast(<NotificationSuccess text="Room updated successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a room." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, [getRoomDetails]);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Rooms</h1>
            <AddRoom save={addRoom} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {rooms.map((_room) => (
              <Room
                room={{
                  ..._room,
                }}
                update={update}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Rooms;
