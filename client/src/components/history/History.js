import React, { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token") || !localStorage.getItem("history")) {
      return window.location.assign("/");
    }

    const tempHistory = JSON.parse(localStorage.getItem("history"));
    const token = JSON.parse(localStorage.getItem("token"));
    let id = token.user._id;

    let temp = [];
    let j = 0;

    for (let i = 0; i < tempHistory.length; i++) {
      if (tempHistory[i].userId === id) {
        temp[j] = tempHistory[i];
        j++;
      }
    }

    setHistory(temp);
  }, []);

  return (
    <div className="history">
      <h2 className="history-title">Order History</h2>
      {history.map((value, index) => {
        return <HistoryItem value={value} key={index} />;
      })}
    </div>
  );
}
