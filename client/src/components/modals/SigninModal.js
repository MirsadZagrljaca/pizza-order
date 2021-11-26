import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Button,
  Alert,
} from "react-bootstrap";
import pizza from "../../assets/pizza.png";
import { signin } from "../auth/api-auth";
import auth from "../auth/auth-helper";

export default function SigninModal({
  signInModal,
  closeModal,
  setIsSignedIn,
  openSignUp,
}) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const changeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickHandler = (e) => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values });
          setIsSignedIn(true);
          closeModal();
        });
      }
    });
  };

  return (
    <div className="signin-modal">
      <Modal show={signInModal}>
        <ModalTitle>
          <p className="modal-title">Sign In</p>
        </ModalTitle>
        <ModalBody>
          <div className="modal-left">
            <img
              src={pizza}
              alt="pizza-modal"
              style={{ width: "150px", height: "150px", marginRight: "35px" }}
            />
          </div>

          <div className="modal-right">
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  style={{ marginBottom: "15px" }}
                  onChange={changeHandler("email")}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={changeHandler("password")}
                />
              </div>
              <div className="modal-buttons">
                <Button variant="outline-primary" onClick={clickHandler}>
                  Sign In
                </Button>{" "}
              </div>
            </form>
          </div>
          <ModalFooter>
            {values.error && (
              <Alert variant="danger" style={{ width: "100%" }}>
                {values.error}
              </Alert>
            )}
            <div className="modal-footer">
              <p className="modal-account">If you don't have an account</p>
              <Button variant="outline-primary" onClick={() => openSignUp()}>
                Sign Up
              </Button>
            </div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
