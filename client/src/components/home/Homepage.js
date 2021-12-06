import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getDough } from ".././apis/api-dough";
import { getIngredients } from ".././apis/api-ingredients";
import Dough from "./Dough";
import Ingredients from "./Ingredients";
import OrderList from "./OrderList";

export default function Homepage({
  orders,
  setOrders,
  isOrderOn,
  setisOrderOn,
}) {
  const [dough, setDough] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOn, setModalIsOn] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    price: 0,
    dough: "",
    ingredients: [],
    times: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getDough().then((response) => {
      let newDough = response.dough.map((obj) => obj);

      setDough(newDough);
    });

    getIngredients().then((response) => {
      let newIngredients = response.ingredients.map((obj) => obj);

      setIngredients(newIngredients);
    });
  }, []);

  useEffect(() => {
    if (currentOrder.ingredients.length === 0) return;

    setOrders([...orders, currentOrder]);
  }, [currentOrder]);

  useEffect(() => {
    if (orders.length === 0) {
      return setTotalPrice(0);
    }

    setTotalPrice(totalPrice + currentOrder.price);
    setCurrentOrder({
      price: 0,
      dough: "",
      ingredients: [],
      times: 0,
    });
  }, [orders]);

  const openModal = (index) => {
    let choosenDough = dough[index];

    setCurrentOrder({
      ...currentOrder,
      price: choosenDough.price,
      dough: choosenDough.name,
      times: 1,
    });

    setModalIsOn(true);
  };

  const closeModal = (e) => {
    setModalIsOn(false);
  };

  const addToCart = (order, price) => {
    if (order.length !== 0 && price !== 0) {
      setCurrentOrder({
        dough: currentOrder.dough,
        price: currentOrder.price + price,
        ingredients: order,
        times: 1,
      });
      closeModal();
    } else {
      setOrders([...orders, currentOrder]);
    }

    setisOrderOn(true);

    closeModal();
  };

  const buy = (e) => {
    if (!localStorage.getItem("token")) return alert("Please Sign In!");

    sessionStorage.setItem("order", JSON.stringify(orders));

    window.location.assign("/order");
  };

  return (
    <div className="home">
      <div className="home-left">
        <div className="home-left-title">Pick a dough</div>
        <div className="home-left-dough">
          {dough.map((value, index) => {
            return (
              <Dough
                value={value}
                key={index}
                openModal={openModal}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className="home-right">
        {isOrderOn ? (
          <div className="orders">
            {orders.map((value, index) => {
              return (
                <OrderList
                  value={value}
                  key={index}
                  index={index}
                  orders={orders}
                  setOrders={setOrders}
                />
              );
            })}
            <div className="orders-footer">
              <p className="orders-total-price">
                Delivery Fee 5$ <br />
                Total Price: {totalPrice + 5}
                {" $"}
              </p>
              <Button variant="outline-primary" onClick={buy}>
                BUY
              </Button>
            </div>
          </div>
        ) : (
          <div className="home-right-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
              style={{ textAlign: "center", margin: "20%", marginLeft: "40%" }}
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </div>
        )}
      </div>

      <div>
        <Ingredients
          modalIsOn={modalIsOn}
          closeModal={closeModal}
          ingredients={ingredients}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}
