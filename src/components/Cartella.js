import React from "react";
import NumberItem from "./NumberItem";
import "./cartella.css";
import { useState } from "react";

const Cartella = ({ offset }) => {
  const [isCalled, setIsCalled] = useState({ row1: [], row2: [], row3: [] });
  return (
    <div className="cartella">
      <div className="row">
        <NumberItem value={offset + 1} isCalled={isCalled.row1[0]} />
        <NumberItem value={offset + 2} isCalled={isCalled.row1[1]} />
        <NumberItem value={offset + 3} isCalled={isCalled.row1[1]} />
        <NumberItem value={offset + 4} />
        <NumberItem value={offset + 5} />
      </div>
      <div className="row">
        <NumberItem value={offset + 11} />
        <NumberItem value={offset + 12} />
        <NumberItem value={offset + 13} />
        <NumberItem value={offset + 14} />
        <NumberItem value={offset + 15} />
      </div>
      <div className="row">
        <NumberItem value={offset + 21} />
        <NumberItem value={offset + 22} />
        <NumberItem value={offset + 23} />
        <NumberItem value={offset + 24} />
        <NumberItem value={offset + 25} />
      </div>
    </div>
  );
};

export default Cartella;
