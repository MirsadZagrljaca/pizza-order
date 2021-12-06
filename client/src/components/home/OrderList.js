import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function OrderList({ value, index, orders, setOrders }) {
  const [render, setRender] = useState(false);

  const plus = (index, e) => {
    let newOrders = orders;
    let basePrice = newOrders[index].price / newOrders[index].times;

    for (let i = 0; i < orders.length; i++) {
      if (i === index) {
        newOrders[i].times++;
        newOrders[i].price += basePrice;
      }
    }

    setRender(!render);
    setOrders(newOrders);
  };

  const minus = (index, e) => {
    let newOrders = orders;
    let basePrice = newOrders[index].price / newOrders[index].times;

    let tempOrders = [];

    if (orders[index].times === 1) {
      for (let i = 0; i < orders.length; i++) {
        if (i !== index) {
          tempOrders.push(orders[i]);
        }
      }

      setOrders(tempOrders);
    } else {
      for (let i = 0; i < orders.length; i++) {
        if (i === index) {
          newOrders[i].times--;
          newOrders[i].price -= basePrice;
        }
      }

      setOrders(newOrders);
    }

    setRender(!render);
  };

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
      <div className="quantity">
        <Button variant="outline-dark" onClick={(e) => minus(index, e)}>
          -
        </Button>

        <p>{value.times}</p>

        <Button
          type="button"
          variant="outline-dark"
          onClick={(e) => {
            plus(index, e);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}
