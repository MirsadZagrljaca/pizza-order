import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalTitle, Button, Alert } from "react-bootstrap";

export default function Ingredients({
  modalIsOn,
  closeModal,
  ingredients,
  addToCart,
}) {
  const [order, setOrder] = useState([]);
  const [price, setPrice] = useState(0);

  const changleHandler = (index) => (e) => {
    const addToOrder = ingredients[index];

    if (e.target.checked) {
      setPrice(price + addToOrder.price);
      setOrder([...order, addToOrder.name]);
    } else {
      setPrice(price - addToOrder.price);

      let newOrder = [];
      let j = 0;

      for (let i = 0; i < order.length; i++) {
        if (order[i] !== addToOrder.name) {
          newOrder[j] = order[i];
          j++;
        }
      }

      setOrder(newOrder);
    }
  };

  return (
    <div className="ingredients">
      <Modal show={modalIsOn}>
        <ModalTitle>
          <h2 className="ingredients-title">Pick an ingredients</h2>
        </ModalTitle>

        <ModalBody style={{ height: "fit-content" }}>
          <div className="ingredients-all">
            {ingredients.map((value, index) => {
              return (
                <div className="ingredients-single" key={index}>
                  <input type="checkbox" onChange={changleHandler(index)} />
                  {value.gluten_free ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                  ) : (
                    <div></div>
                  )}
                  <p className="ingredients-single-name">{value.name}</p>
                  <p className="ingredients-single-price">
                    {value.price}
                    {" $"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="ingredients-buttons">
            <Button
              variant="outline-primary"
              onClick={() => {
                addToCart(order, price);
                setOrder([]);
              }}
            >
              Add To Cart
            </Button>
            <Button variant="outline-danger" onClick={() => closeModal()}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
