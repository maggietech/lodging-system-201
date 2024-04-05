import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddGuest from "./AddGuest";
import Guest from "./Guest";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getAllGuests as getGuestList,
  registerGuest,
  updateGuest
} from "../../utils/guestService";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of guests
  const getGuests = useCallback(async () => {
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
      registerGuest(data).then((resp) => {
        getGuests();
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


  useEffect(() => {
    getGuests();
  }, []);

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
                key={_guest.id}
                getGuests={getGuests}
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
