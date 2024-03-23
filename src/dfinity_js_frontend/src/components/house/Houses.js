import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddHouse from "./AddHouse";
import House from "./House";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getHouseDetails as getHouseList,
  registerHouse, updateHouse
} from "../../utils/houseService";

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);


  // function to get the list of products
  const getHouseDetails = useCallback(async () => {
    try {
      setLoading(true);
      setHouses(await getHouseList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addHouse = async (data) => {
    try {
      setLoading(true);
      const idStr = data.id;
      data.id = parseInt(idStr, 10);
      registerHouse(data).then((resp) => {
        getHouseDetails();
      });
      toast(<NotificationSuccess text="House added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to register a house." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      data.id = parseInt(data.id, 10);
      updateHouse(data).then((resp) => {
        getHouseDetails();
        toast(<NotificationSuccess text="House added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add a house." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHouseDetails();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Houses</h1>
            <AddHouse save={addHouse} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {houses.map((_houses) => (
              <House
                house={{
                  ..._house,
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

export default Houses;