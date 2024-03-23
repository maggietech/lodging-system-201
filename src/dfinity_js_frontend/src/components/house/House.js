import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import UpdateHouse from "./UpdateHouse";

const House = ({ house, update }) => {
  const { id, name, owner, created_date } = house;

  const triggerUpdate = () => {
    update(id);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{Principal.from(owner).toText()}</span>
            <Badge bg="secondary" className="ms-auto">
              {new Date(created_date).toLocaleDateString()}
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-secondary">
            <span>{Principal.from(owner).toText()}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerUpdate}
            className="w-100 py-3"
          >
             <UpdateHouse house={house} save={update} />
             update
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

House.propTypes = {
  house: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.func.isRequired,
};

export default House;
