import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddRoom from "./AddRoom";
import Room from "./Room";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getRooms as getRoomList,
  registerRoom,
  updateRoom
} from "../../utils/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of rooms
  const getRooms = useCallback(async () => {
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
      registerRoom(data).then((resp) => {
        getRooms();
      });
      toast(<NotificationSuccess text="Room added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to register a room." />);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getRooms();
  }, []);

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
                key={_room.id}
                getRooms={getRooms}

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
