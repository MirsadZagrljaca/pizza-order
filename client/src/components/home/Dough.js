import React from "react";
import { Button } from "react-bootstrap";

export default function Dough({ value, openModal, index }) {
  return (
    <div className="single-dough">
      <div className="single-dough-header">
        <h2 className="single-title">{value.name}</h2>
        <Button
          variant="outline-dark"
          style={{ marginRight: "5px", padding: "4px" }}
          onClick={() => openModal(index)}
        >
          + ADD
        </Button>
      </div>
      <p className="single-description">{value.description}</p>
    </div>
  );
}
