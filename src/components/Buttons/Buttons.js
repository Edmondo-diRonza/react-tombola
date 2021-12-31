import React from "react";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import "./buttons.css";

const Buttons = () => {
  const { startGame, callNumbers } = useContext(NumberContext);
  return (
    <div>
      <button className="btn" onClick={() => startGame()}>
        Inizia Partita
      </button>

      <button className="btn" onClick={() => callNumbers()}>
        Chiama Numero
      </button>
    </div>
  );
};

export default Buttons;