 /* eslint-disable */ 
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Order() {
  const [adress, setAdress] = useState([]);
  const [order, setOrder] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [values, setValues] = useState({
    userId: "",
    adress: "",
    floor: "",
  });
  const [choosenAdress, setChoosenAdress] = useState({
    userId: "",
    adress: "",
    floor: "",
  });
  const [choosenIndex, setchoosenIndex] = useState(0);
  const [total, seTtotal] = useState(0);
  const [render, setRender] = useState(false);
  const [tempAdress, setTempAdress] = useState([]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("order") || !sessionStorage.getItem("token")) {
      window.location.assign("/");
    }

    if (sessionStorage.getItem("order")) {
      setOrder(JSON.parse(sessionStorage.getItem("order")));
    }

    setOrder(JSON.parse(sessionStorage.getItem("order")));

    const token = JSON.parse(sessionStorage.getItem("token"));
    const user = token.user._id;

    setValues({ ...values, userId: user });

    axios.get("http://localhost:5000/api/adress").then((resp) => {
      setTempAdress(resp.data);
    });
  }, []);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = token.user._id;

    let newAdress = [];

    for (let i = 0; i < tempAdress.length; i++) {
      if (tempAdress[i].userId === id) {
        newAdress.push(tempAdress[i]);
      }
    }

    setAdress(newAdress);
  }, [tempAdress]);

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
      setAdress([values]);

      const data = {
        userId: values.userId,
        adress: values.adress,
        floor: values.floor,
      };

      axios
        .post("http://localhost:5000/api/adress", data)
        .then((resp) => {
          setAdress([...adress, resp.data]);
        })
        .catch((err) => console.log(err));

      setIsAdd(false);
    }
  };

  const removeAdress = (index, e) => {
    let tempAdresses = [];
    let id = "";

    adress.map((v, i) => {
      if (i !== index) {
        tempAdresses.push(v);
      } else {
        id = v._id;
      }
    });

    setAdress(tempAdresses);
    axios
      .delete(`http://localhost:5000/api/adress/${id}`)
      .then((resp) => console.log(resp.data));
  };

  const chooseAdress = (index, e) => {
    setChoosenAdress(adress[index]);
    setchoosenIndex(index);

    let inputs = [];

    adress.map((v, i) => {
      if (index !== i) {
        inputs.push(document.getElementById("input-radio-" + i));
      }
    });

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };

  const orderHandler = (e) => {
    let user = JSON.parse(sessionStorage.getItem("token"));
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

    if (ingredients.length === 0) {
      ingredients = "No Ingredients";
    }

    let tempHistory = {
      userId: id,
      total: total,
      date: date,
      dough: dough,
      ingredients: ingredients,
      times: order[0].times,
    };

    axios
      .post("http://localhost:5000/api/history", tempHistory)
      .then((response) => {
        sessionStorage.removeItem("order");
        window.location.assign("/history");
      })
      .catch((err) => console.log(err));
  };

  const plus = (index, e) => {
    let newOrders = order;
    let basePrice = newOrders[index].price / newOrders[index].times;

    for (let i = 0; i < order.length; i++) {
      if (i === index) {
        newOrders[i].times++;
        newOrders[i].price += basePrice;
      }
    }

    setOrder(newOrders);
    updateTotal();
    setRender(!render);
  };

  const minus = (index, e) => {
    let newOrders = order;
    let basePrice = newOrders[index].price / newOrders[index].times;

    let tempOrders = [];

    if (order[index].times === 1) {
      return;
    } else {
      for (let i = 0; i < order.length; i++) {
        if (i === index) {
          newOrders[i].times--;
          newOrders[i].price -= basePrice;
        }
      }

      setOrder(newOrders);
    }
    updateTotal();

    setRender(!render);
  };

  const updateTotal = () => {
    let tempTotal = 0;
    for (let i = 0; i < order.length; i++) {
      tempTotal += order[i].price;
    }
    tempTotal += 5;

    seTtotal(tempTotal);
  };

  return (
    <div className="final">
      <div className="adress">
        <h2 className="adress-title">Adress to deliver</h2>
        <div className="adress-s">
          {adress.map((value, index) => {
            return (
              <div className="adress-single" key={index}>
                <div className="adress-single-top">
                  <input
                    id={"input-radio-" + index}
                    type="radio"
                    onClick={(e) => chooseAdress(index, e)}
                  />
                  <p className="adress-single-adress">{value.adress}</p>
                  <p className="adress-single-floor">{value.floor}</p>
                </div>
                <button
                  className="adress-choose"
                  onClick={(e) => {
                    removeAdress(index, e);
                  }}
                >
                  Remove
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
          <input type="radio" className="payment-input" defaultChecked={true} />
          <p className="payment-checkbox">Upon Delivery</p>
        </div>
        <div className="payment-order">
          <h2 className="payment-order-title">Order</h2>
          {order.map((value, index) => {
            return (
              <div className="order-single" key={index}>
                <p>{value.dough}</p>{" "}
                <div className="single-quantity">
                  <Button
                    variant="outline-dark"
                    onClick={(e) => minus(index, e)}
                  >
                    -
                  </Button>
                  {value.times}
                  <Button
                    variant="outline-dark"
                    onClick={(e) => plus(index, e)}
                  >
                    +
                  </Button>
                </div>
                <span className="price">{value.price} $</span>
              </div>
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
          disabled={choosenAdress.adress === ""}
        >
          {choosenAdress.adress === "" ? (
            <p>Please Select an Adress</p>
          ) : (
            <p>O R D E R</p>
          )}
        </Button>
      </div>
    </div>
  );
}
