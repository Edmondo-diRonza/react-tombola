import "./numberOverlay.css";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import React from "react";
// import { speakNow } from "../../util/speakNow";


const NumberOverlay = () => {
  const { thisGameNumbers, indexOfExtracted, showOverlay, myInterval } =
    useContext(NumberContext);
  return (
    <>
      <div className={showOverlay.overlay}>
        <div
          className={showOverlay.bigNumber}
          onClick={() => {
            clearInterval(myInterval.current);
            myInterval.current = false;
            // speakNow("Autoestrazione interrotta!")
          }}
        >
          {thisGameNumbers.current.numbers[indexOfExtracted.current]}
        </div>
      </div>
    </>
  );
};

export default NumberOverlay;
