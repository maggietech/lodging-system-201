import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import UpdatePayment from "./UpdatePayment";
const Payment = ({ payment, update }) => {
  const { id, reservation_id, amount, created_date } = payment;

  const triggerUpdate = () => {
    // Handle update action here
    update(id);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex flex-column text-center">
          <Card.Text className="text-secondary">Reservation ID: {reservation_id}</Card.Text>
          <Card.Text className="text-secondary">Amount: {amount}</Card.Text>
          <Card.Text className="text-secondary">Created Date: {new Date(created_date).toLocaleDateString()}</Card.Text>
          <Button variant="outline-dark" onClick={triggerUpdate} className="w-100 py-3">
          <UpdatePayment payment={payment} save={update} />
            Update
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Payment.propTypes = {
  payment: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.func.isRequired,
};

export default Payment;
