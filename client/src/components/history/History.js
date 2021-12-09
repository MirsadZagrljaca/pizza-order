 /* eslint-disable */ 
import axios from "axios";
import React, { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";

export default function History() {
  const [history, setHistory] = useState([]);
  const [tempHistory, setTempHistory] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    let tempHistory = [];

    axios.get("http://localhost:5000/api/history").then((res) => {
      setTempHistory(res.data);
    });
  }, []);

  useEffect(() => {
    let temp = [];
    let j = 0;

    const token = JSON.parse(sessionStorage.getItem("token"));
    let id = token.user._id;

    for (let i = 0; i < tempHistory.length; i++) {
      if (tempHistory[i].userId === id) {
        temp[j] = tempHistory[i];
        if (tempHistory[i].ingredients.length === 0) {
          delete temp[j].ingredients;
        }
        j++;
      }
    }

    console.log(tempHistory);

    setHistory(temp);
  }, [tempHistory]);

  return (
    <div className="history">
      <h2 className="history-title">Order History</h2>
      {history.map((value, index) => {
        return <HistoryItem value={value} key={index} />;
      })}
    </div>
  );
}
