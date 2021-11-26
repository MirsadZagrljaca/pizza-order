import React from "react";
import { Button } from "react-bootstrap";

export default function OrderList({ value, index }) {
  return (
    <div className="single-order">
      <div className="single-order-header">
        <h3 className="single-order-title">{value.dough}</h3>
        <p className="single-order-price">
          {value.price} {" $"}
        </p>
      </div>
      <div className="single-order-ingredients">
        {value.ingredients.map((values, index) => {
          return (
            <p className="single-order-ingredients" key={index}>
              {values}{" "}
            </p>
          );
        })}
      </div>
    </div>
  );
}
