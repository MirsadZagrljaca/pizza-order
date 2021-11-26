import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalTitle, Button } from "react-bootstrap";

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
