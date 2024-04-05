import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import UpdateHouse from "./UpdateHouse";

const House = ({ house, getHouses }) => {

  const { id, name,address, description } = house;

  // const triggerUpdate = () => {
  //   update(id);
  // };

  return (
    <Col>
      <Card>
        {/* id */}
        <Card.Header>
          <Badge bg="secondary">{id}</Badge>
        </Card.Header>
        <Card.Body>

          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Stack direction="horizontal" gap={2}>
            <UpdateHouse id={id}  getHouses={getHouses}/>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};



export default House;
