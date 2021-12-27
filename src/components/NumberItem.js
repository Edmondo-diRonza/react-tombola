import React from "react";
import "./numberItem.css";
import { speakNow } from "../util/speakNow";
import { useContext } from "react";
import { NumberContext } from "../context/Numbers";

const NumberItem = ({ value, isCalled = false }) => {
  const { searchNumber } = useContext(NumberContext);
  let className = "number-item";
  if (isCalled) className += " called-number";
  return (
    <>
      <div
        className={className}
        onClick={() => {
          isCalled
            ? speakNow(
                `Il numero ${value} è stato estratto nell'estrazione numero ${searchNumber(
                  value
                )}`
              )
            : speakNow(`Il numero ${value} non è ancora stato estratto`);
        }}
      >
        {value}
      </div>
    </>
  );
};
export default NumberItem;
