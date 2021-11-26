import React, { useState } from "react";
import Header from "./components/core/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninModal from "./components/modals/SigninModal";
import SignupModal from "./components/modals/SignupModal";
import Homepage from "./components/home/Homepage";
import Order from "./components/order/Order";
import History from "./components/history/History";

function App() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isOrderOn, setIsOrderOn] = useState(false);

  const openModal = () => {
    setSignInModal(true);
    setSignUpModal(false);
  };

  const closeModal = () => {
    setSignInModal(false);
  };

  const openSignUp = (e) => {
    setSignInModal(false);
    setSignUpModal(true);
  };

  const closeSignUp = (e) => {
    setSignUpModal(false);
    setSignInModal(false);
  };

  return (
    <div className="app">
      <Header
        openModal={openModal}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        isOrderOn={isOrderOn}
      />

      <SigninModal
        signInModal={signInModal}
        closeModal={closeModal}
        setIsSignedIn={setIsSignedIn}
        openSignUp={openSignUp}
      />

      <SignupModal
        signUpModal={signUpModal}
        openModal={openModal}
        setSignInModal={setSignInModal}
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                orders={orders}
                setOrders={setOrders}
                isOrderOn={isOrderOn}
                setisOrderOn={setIsOrderOn}
              />
            }
          />
          <Route path="/order" element={<Order orders={orders} />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
