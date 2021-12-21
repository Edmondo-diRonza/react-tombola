import React from "react";
import "./numberItem.css";

const NumberItem = ({ value, isCalled = false }) => {
  return (
    <>
      {!isCalled ? (
        <div className="number-item">{value}</div>
      ) : (
        <div className="number-item called-number">{value}</div>
      )}
    </>
  );
};

export default NumberItem;
