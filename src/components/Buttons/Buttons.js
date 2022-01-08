import React from "react";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import "./buttons.css";
import { speakNow } from "../../util/speakNow";

const Buttons = () => {
  const {
    startGame,
    callNumbers,
    indexOfExtracted,
    winType,
    myInterval,
    winningList,
    setWinType,
  } = useContext(NumberContext);
  const buttonStatus = indexOfExtracted.current === false || winType > 5;
  const oneStepBackwardFlag = indexOfExtracted.current >= 0; // check se possibile tornare indietro

  const handleStepBackward = () => {
    if (oneStepBackwardFlag) {
      indexOfExtracted.current -= 1;
      callNumbers();
    }
  };
  const handleAutoExtraction = () => {
    speakNow("Autoestrazione attiva!");
    callNumbers();
    myInterval.current = setInterval(() => callNumbers(), 6000);
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
            <i className="fas fa-redo"></i> Ripeti
          </button>
          <button
            className={buttonStatus ? "btn greyed" : "btn  "}
            onClick={() => handleAutoExtraction()}
          >
            AUTO <i className="fas fa-robot"></i>
          </button>
          <button
            className={myInterval.current ? "btn " : "btn greyed "}
            onClick={() => {
              clearInterval(myInterval.current);
              myInterval.current = -1;
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
          <div className="show-winstatus">
            <span>
              {winType !== 6 ? "Si aspetta:" : ""}{" "}
              <strong>{winningList[winType]}</strong>{" "}
            </span>
            {winType !== 6 ? (
              <button
                className={buttonStatus ? "btn small greyed" : "btn small  "}
                onClick={() => {                  
                  if (indexOfExtracted.current >= winType) {
                    if (winType < 5) {
                      setWinType((prev) => prev + 1);
                    } else if (winType === 5 && indexOfExtracted.current > 13) {
                      setWinType((prev) => prev + 1);
                    } else alert("Per una TOMBOLA dei partecipanti, servono ALMENO 15 numeri estratti!");
                  }else alert(winningList[winType] + " dei partecipanti IMPOSSIBILE! Numeri estratti INSUFFICIENTI");
                }}
              >
                Già Preso <i className="fas fa-sad-cry"></i>
              </button>
            ) : (
              ""
            )}
          </div>

          {/* <div className="checkboxes greyed">
            <input
              type="checkbox"
              id="overlay-checkbox"
              checked={true}
              onChange={() => null}
            />
            <label for="overlay-checkbox">Mostra Numero</label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
