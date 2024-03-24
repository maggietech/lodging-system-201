import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddPayment from "./AddPayment";
import Payment from "./Payment";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getPaymentDetails as getPaymentList,
  processPayment,
  updatePayment
} from "../../utils/paymentService";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get the list of payments
  const getPaymentDetails = useCallback(async () => {
    try {
      setLoading(true);
      setPayments(await getPaymentList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to add a payment
  const addPayment = async (data) => {
    try {
      setLoading(true);
      const idStr = data.id;
      data.id = parseInt(idStr, 10);
      processPayment(data).then((resp) => {
        getPaymentDetails();
      });
      toast(<NotificationSuccess text="Payment processed successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to process payment." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, [getPaymentDetails]);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Payments</h1>
            <AddPayment save={addPayment} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {payments.map((_payment) => (
              <Payment
                payment={{
                  ..._payment,
                }}
                update={updatePayment} // Assuming you have an updatePayment function to handle updates
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

export default Payments;
