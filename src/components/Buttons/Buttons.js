import React from "react";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import "./buttons.css";

const Buttons = () => {
  const { startGame, callNumbers, indexOfExtracted, winType } =
    useContext(NumberContext);
  const buttonStatus =
    indexOfExtracted.current === false || winType.current > 5;
  return (
    <div>
      <button className="btn" onClick={() => startGame()}>
        {buttonStatus ? "Nuova" : "Reset"}
      </button>

      <button
        className={buttonStatus ? "btn greyed" : "btn "}
        onClick={() => callNumbers()}
      >
        Chiama Numero
      </button>
    </div>
  );
};

export default Buttons;
