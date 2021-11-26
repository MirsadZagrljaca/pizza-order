import React, { useState } from "react";
import { Modal, ModalBody, ModalTitle, Button, Alert } from "react-bootstrap";
import { create } from "../user/api-users";

export default function SignupModal({
  signUpModal,
  openModal,
  setSignInModal,
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const changeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickHandler = (e) => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        openModal();
        setSignInModal(true);
      }
    });
  };

  return (
    <div className="signup">
      <Modal show={signUpModal}>
        <ModalTitle>
          <p className="signup-title">Sign Up</p>
        </ModalTitle>

        <ModalBody>
          <form>
            <div className="form-group">
              <input
                type="name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                style={{ marginBottom: "15px" }}
                onChange={changeHandler("name")}
              />
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
            <div className="signup-buttons">
              <Button variant="outline-primary" onClick={clickHandler}>
                Register
              </Button>
            </div>
            <div className="signup-signin">
              <p className="signup-signin-p">Already have an account</p>
              <Button variant="outline-primary" onClick={() => openModal()}>
                Sign In
              </Button>
            </div>
          </form>
        </ModalBody>

        {values.error && (
          <Alert variant="danger" style={{ width: "100%" }}>
            {values.error}
          </Alert>
        )}
      </Modal>
    </div>
  );
}
