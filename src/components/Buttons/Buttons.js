import React from "react";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import "./buttons.css";
// import { speakNow } from "../../util/speakNow";

const Buttons = () => {
  const { startGame, callNumbers, indexOfExtracted, winType, myInterval } =
    useContext(NumberContext);
  const buttonStatus =
    indexOfExtracted.current === false || winType.current > 5;
  const winningList = [
    "AMBO",
    "AMBO",
    "TERNO",
    "QUATERNA",
    "CINQUINA",
    "TOMBOLA",
  ];
  const oneStepBackwardFlag = indexOfExtracted.current >= 0; // check se possibile tornare indietro

  const handleStepBackward = () => {
    if (oneStepBackwardFlag) {
      indexOfExtracted.current -= 1;
      callNumbers();
    }
  };
  return (
    <div>
      <div className="buttons-container">
        <div className="game-setup">
          <button className="btn" onClick={() => startGame()}>
            {buttonStatus ? "Nuova Partita " : "Reset Partita"}
          </button>
        </div>
        <div className="main-buttons">
          <button
            className={
              buttonStatus || !oneStepBackwardFlag ? "btn greyed" : "btn "
            }
            onClick={() => handleStepBackward()}
          >
            <i className="fas fa-chevron-circle-left"></i> Ultimo
          </button>
          <button
            className={buttonStatus ? "btn greyed" : "btn  "}
            onClick={() => {
              alert(
                "Disabilitata perchè presenta funzionamento altalenante! Riprova fra qualche giorno!"
              );
              // speakNow("Autoestrazione attiva!")
              // callNumbers();
              // myInterval.current = setInterval(() => callNumbers(), 12000);
            }}
          >
            AUTO <i className="fas fa-robot"></i>
          </button>
          <button
            className={myInterval.current ? "btn " : "btn greyed "}
            onClick={() => {
              clearInterval(myInterval.current);
              myInterval.current = false;
            }}
          >
            STOP <i className="fas fa-robot"></i>
          </button>

          <button
            className={buttonStatus ? "btn greyed" : "btn "}
            onClick={() => callNumbers()}
          >
            Avanti <i className="fas fa-chevron-circle-right"></i>
          </button>
        </div>
        <div className="winning-summary">
          <p>Si aspetta: </p>
          <p>
            <strong>{winningList[winType.current]}</strong>
          </p>
          {/* <button
            className={buttonStatus ? "btn greyed" : "btn "}
            onClick={() => (winType.current = winType.current++)}
          >
            Effettuata!
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
