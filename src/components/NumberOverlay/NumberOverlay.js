import "./numberOverlay.css";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import React from "react";
import WinOverlay from "../WinOverlay/WinOverlay";
// import { speakNow } from "../../util/speakNow";

const NumberOverlay = () => {
  const { thisGameNumbers, indexOfExtracted, showOverlay, myInterval } =
    useContext(NumberContext);
  return (
    <>
      <div
        className={showOverlay.overlay}
        onClick={() => {
          if (myInterval.current) {
            clearInterval(myInterval.current);
            myInterval.current = false;
          }
        }}
      >
        <div className={showOverlay.bigNumber}>
          {thisGameNumbers.current.numbers[indexOfExtracted.current]}
        </div>
        <WinOverlay />
      </div>
    </>
  );
};

export default NumberOverlay;
