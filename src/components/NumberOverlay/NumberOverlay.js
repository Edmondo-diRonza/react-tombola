import "./numberOverlay.css";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import React from "react";

const NumberOverlay = () => {
  const { thisGameNumbers, indexOfExtracted, showOverlay } =
    useContext(NumberContext);
  return (
    <>
      <div className={showOverlay.overlay} >
        <div className={showOverlay.bigNumber} >
          {thisGameNumbers.current.numbers[indexOfExtracted.current]}
        </div>
      </div>
    </>
  );
};

export default NumberOverlay;
