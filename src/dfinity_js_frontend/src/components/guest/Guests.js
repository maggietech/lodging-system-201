import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddGuest from "./AddGuest";
import Guest from "./Guest";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getGuestDetails as getGuestList,
  registerGuest,
  updateGuest
} from "../../utils/guestService";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of guests
  const getGuestDetails = useCallback(async () => {
    try {
      setLoading(true);
      setGuests(await getGuestList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to add a guest
  const addGuest = async (data) => {
    try {
      setLoading(true);
      const idStr = data.id;
      data.id = parseInt(idStr, 10);
      registerGuest(data).then((resp) => {
        getGuestDetails();
      });
      toast(<NotificationSuccess text="Guest added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to register a guest." />);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a guest
  const update = async (data) => {
    try {
      setLoading(true);
      data.id = parseInt(data.id, 10);
      updateGuest(data).then((resp) => {
        getGuestDetails();
        toast(<NotificationSuccess text="Guest updated successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a guest." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuestDetails();
  }, [getGuestDetails]);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Guests</h1>
            <AddGuest save={addGuest} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {guests.map((_guest) => (
              <Guest
                guest={{
                  ..._guest,
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

export default Guests;
