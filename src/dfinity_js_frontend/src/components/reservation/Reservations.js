import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddReservation from "./AddReservation";
import Reservation from "./Reservation";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getReservation as getReservationList,
  createReservation,
  updateReservation
} from "../../utils/reservationService";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of reservations
  const getReservation = useCallback(async () => {
    try {
      setLoading(true);
      setReservations(await getReservationList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to add a reservation
  const addReservation = async (data) => {
    try {
      setLoading(true);
      const idStr = data.id;
      data.id = parseInt(idStr, 10);
      createReservation(data).then((resp) => {
        getReservation();
      });
      toast(<NotificationSuccess text="Reservation created successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create reservation." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Reservations</h1>
            <AddReservation save={addReservation} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {reservations.map((_reservation) => (
              <Reservation
                reservation={{
                  ..._reservation,
                }}
                update={updateReservation} // Assuming you have an updateReservation function to handle updates
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

export default Reservations;
