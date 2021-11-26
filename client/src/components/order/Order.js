import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Order() {
  const [adress, setAdress] = useState([]);
  const [order, setOrder] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [values, setValues] = useState({
    adress: "",
    floor: "",
  });
  const [choosenAdress, setChoosenAdress] = useState({
    adress: "",
    floor: "",
  });
  const [choosenIndex, setchoosenIndex] = useState(0);
  const [total, seTtotal] = useState(0);
  const [history, setHistory] = useState([]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("order") || !localStorage.getItem("token")) {
      window.location.assign("/");
    }

    if (localStorage.getItem("adress")) {
      setAdress(JSON.parse(localStorage.getItem("adress")));
    }

    if (sessionStorage.getItem("order")) {
      setOrder(JSON.parse(sessionStorage.getItem("order")));
    }

    if (localStorage.getItem("history")) {
      setHistory(JSON.parse(localStorage.getItem("history")));
    }

    setOrder(JSON.parse(sessionStorage.getItem("order")));
  }, []);

  useEffect(() => {
    localStorage.setItem("adress", JSON.stringify(adress));
  }, [adress]);

  useEffect(() => {
    if (history.length === 0) return;

    localStorage.setItem("history", JSON.stringify(history));

    console.log(history);
  }, [history]);

  useEffect(() => {
    if (order.length === 0) return;

    let tempTotal = 0;
    for (let i = 0; i < order.length; i++) {
      tempTotal += order[i].price;
    }
    tempTotal += 5;

    seTtotal(tempTotal);
  }, [order]);

  const addAdress = (e) => {
    if (values.adress !== "" || values.floor !== "") {
      if (adress.length === 0) {
        setAdress([values]);
      } else {
        setAdress([...adress, values]);
      }
      setIsAdd(false);
    }
  };

  const chooseAdress = (index, e) => {
    setChoosenAdress(adress[index]);
    setchoosenIndex(index);
  };

  const orderHandler = (e) => {
    let user = JSON.parse(localStorage.getItem("token"));
    let id = user.user._id;
    let now = new Date();
    let date =
      now.getDate() +
      "." +
      now.getMonth() +
      "." +
      now.getFullYear() +
      " " +
      now.getHours() +
      ":" +
      now.getMinutes();

    let dough = "";
    let ingredients = "";

    for (let i = 0; i < order.length; i++) {
      dough += order[i].dough + " ";
      for (let j = 0; j < order[i].ingredients.length; j++) {
        ingredients += order[i].ingredients[j] + " ";
      }
    }

    console.log(dough, ingredients);

    let tempHistory = {
      userId: id,
      total: total,
      date: date,
      dough: dough,
      ingredients: ingredients,
    };

    if (history.length === 0) {
      setHistory([tempHistory]);
      sessionStorage.removeItem("order");
      window.location.assign("/history");
    } else {
      setHistory([...history, tempHistory]);
      sessionStorage.removeItem("order");
      window.location.assign("/history");
    }
  };

  return (
    <div className="final">
      <div className="adress">
        <h2 className="adress-title">Adress to deliver</h2>
        <div className="adress-s">
          {adress.map((value, index) => {
            return (
              <div
                className={
                  index === choosenIndex
                    ? "adress-single-choosen"
                    : "adress-single"
                }
                key={index}
              >
                <p className="adress-single-adress">{value.adress}</p>
                <p className="adress-single-floor">{value.floor}</p>
                <button
                  className="adress-choose"
                  onClick={(e) => {
                    chooseAdress(index, e);
                  }}
                >
                  Choose
                </button>
              </div>
            );
          })}
          <div className="adress-single-add">
            {isAdd ? (
              <div className="adress-form">
                <input
                  type="text"
                  placeholder="Adress..."
                  onChange={handleChange("adress")}
                  className="adress-form-input"
                />
                <input
                  type="number"
                  placeholder="Floor..."
                  onChange={handleChange("floor")}
                  className="adress-form-input"
                />
                <button className="adress-form-add" onClick={addAdress}>
                  Add
                </button>
              </div>
            ) : (
              <button
                className="adress-single-add-btn"
                onClick={() => setIsAdd(true)}
              >
                Add New
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="payment">
        <div className="payment-choice">
          <h2 className="payment-title">Payment</h2>
          <input
            type="checkbox"
            className="payment-input"
            defaultChecked={true}
          />
          <p className="payment-checkbox">Upon Delivery</p>
        </div>
        <div className="payment-order">
          <h2 className="payment-order-title">Order</h2>
          {order.map((value, index) => {
            return (
              <p className="order-single" key={index}>
                {value.dough} <span className="price">{value.price} $</span>
              </p>
            );
          })}
          <p className="payment-order-p">
            Delivery <span className="price">5 $</span>
          </p>
        </div>
        <p className="payment-order-total">
          <b>TOTAL</b> <span className="price">{total} $</span>
        </p>
        <div className="payment-notes">
          <p className="payment-notes-p">Note:</p>
          <textarea />
        </div>
        <Button
          variant="outline-primary"
          onClick={orderHandler}
          style={{ marginLeft: "40%", marginBottom: "15px" }}
        >
          O R D E R
        </Button>
      </div>
    </div>
  );
}