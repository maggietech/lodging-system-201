import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddHouse from "./AddHouse";
import House from "./House";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  
  getHouses as getHouseList,
  registerHouse, updateHouse
} from "../../utils/houseService";

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);


  // function to get the list of products
  const getHouses = useCallback(async () => {
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
      registerHouse(data).then((resp) => {
        getHouses();
      });
      toast(<NotificationSuccess text="House added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to register a house." />);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getHouses();
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
            {houses.map((_house) => (
              <House
                house={{
                  ..._house,
                }}
                key={_house.id}
                getHouses={getHouses}
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