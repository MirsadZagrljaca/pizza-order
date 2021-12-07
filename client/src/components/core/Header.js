import React, { useEffect, useState } from "react";
import pizza from "../../assets/pizza.png";
import { Button } from "react-bootstrap";
import auth from "../auth/auth-helper";

export default function Header({
  openModal,
  isSignedIn,
  setIsSignedIn,
  isOrderOn,
}) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) setIsSignedIn(true);
  }, []);

  const clickHandler = (e) => {
    auth.clearToken(() => window.location.assign("/"));
  };

  const icons = () => {
    return (
      <div>
        {isOrderOn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src={pizza}
          alt="pizza-logo"
          style={{ width: "50px", height: "50px" }}
        />
        <h2 className="header-title">Pizza Order Composer</h2>
      </div>

      <div className="header-right">
        {isSignedIn ? (
          <>
            <Button variant="outline-dark" onClick={() => setMenu(!menu)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-primary" onClick={openModal}>
              Sign In
            </Button>
          </>
        )}
        <Button variant="outline-dark">{icons()}</Button>
      </div>
      {menu ? (
        <div className="menu">
          <Button
            variant="secondary"
            style={{
              width: "100px",
              height: "50px",
              fontSize: "17px",
              borderRadius: "0px",
              border: "1px solid black",
            }}
            onClick={clickHandler}
          >
            Sign Out
          </Button>
          <Button
            variant="secondary"
            style={{
              width: "100px",
              height: "50px",
              fontSize: "15px",
              borderRadius: "0px",
              border: "1px solid black",
            }}
            onClick={() => window.location.assign("/history")}
          >
            Order History
          </Button>
          <Button
            variant="secondary"
            style={{
              width: "100px",
              height: "50px",
              fontSize: "17px",
              borderRadius: "0px",
              border: "1px solid black",
            }}
            onClick={() => window.location.assign("/")}
          >
            Home
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
