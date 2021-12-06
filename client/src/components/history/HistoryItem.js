import React from "react";

export default function HistoryItem({ value }) {
  return (
    <div>
      <div className="history-single">
        <div className="history-single-first">
          <p className="history-single-name">{value.dough} x{value.times}</p>
          <p className="history-single-price">
            {value.total}
            {" $"}
          </p>
        </div>
        <div className="history-single-second">
          <div className="history-single-ingredients">
            <p className="history-single-ingredients">{value.ingredients} </p>
          </div>

          <p className="history-single-date">{value.date}</p>
        </div>
      </div>
    </div>
  );
}
