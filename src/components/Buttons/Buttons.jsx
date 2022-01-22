import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { NumberContext } from "../../context/Numbers";
import "./buttons.css";
import { speakNow } from "../../util/speakNow";
import { getCookieValue } from "../../util/getCookieValue";

const Buttons = () => {
  const {
    startGame,
    callNumbers,
    indexOfExtracted,
    winType,
    myInterval,
    winningList,
    setWinType,
    setIsCalled,
    thisGameNumbers,
    winningArray,
    tomorrow,
  } = useContext(NumberContext);
  const buttonStatus = indexOfExtracted.current === false || winType > 5;
  const oneStepBackwardFlag = indexOfExtracted.current >= 0; // check se possibile tornare indietro
  const [resumeGame, setResumeGame] = useState("btn");

  const handleStepBackward = () => {
    if (oneStepBackwardFlag) {
      indexOfExtracted.current -= 1;
      callNumbers(showOveralay, isMute);
    }
  };
  const handleAutoExtraction = () => {
    speakNow("Autoestrazione attiva!", isMute);
    callNumbers(showOveralay, isMute);
    myInterval.current = setInterval(
      () => callNumbers(showOveralay, isMute),
      7000
    );
  };
  //funzione ripristino partita
  const handleResume = () => {
    setResumeGame("btn small greyed");

    thisGameNumbers.current = getCookieValue("array", "J");
    setIsCalled(getCookieValue("isCalled", "J")); // ripristino isCalled
    indexOfExtracted.current = getCookieValue("index", "I");

    const restoredWinType = getCookieValue("winType", "I");
    restoredWinType ? setWinType(restoredWinType) : setWinType(1);

    const restoredWA = getCookieValue("winningArray", "J");
    if (restoredWA) {
      winningArray.current = restoredWA;
    }
  };

  const disableResumeButton = () => {
    if (getCookieValue("array", "J")) {
      if (getCookieValue("index", "I") > 0) {
        return false;
      } else {
        return true;
      }
    } else return true;
  };

  useEffect(() => {
    disableResumeButton()
      ? setResumeGame("btn small greyed")
      : setResumeGame("btn small");
  }, []);
  const [showOveralay, setShowOverlay] = useState(true);
  const [isMute, setIsMute] = useState(false);

  return (
    <>
      <div className="buttons-container">
        <div className="game-setup">
          <button className={resumeGame} onClick={() => handleResume()}>
            <i className="fas fa-save"></i> Precedente
          </button>

          <button
            className="btn small"
            onClick={() => {
              setResumeGame("btn small greyed");
              startGame();
            }}
          >
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
            onClick={() => callNumbers(showOveralay, isMute)}
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
                      document.cookie = `winType=${
                        winType + 1
                      };expires=${tomorrow.toUTCString()}`; //aggiorno il  cookie
                    } else if (winType === 5 && indexOfExtracted.current > 13) {
                      setWinType((prev) => prev + 1);
                      document.cookie = `winType=${
                        winType + 1
                      };expires=${tomorrow.toUTCString()}`; //aggiorno il cookie
                    } else
                      alert(
                        "Per una TOMBOLA dei partecipanti, servono ALMENO 15 numeri estratti!"
                      );
                  } else
                    alert(
                      winningList[winType] +
                        " dei partecipanti IMPOSSIBILE! Numeri estratti INSUFFICIENTI"
                    );
                }}
              >
                Già Preso <i className="fas fa-sad-cry"></i>
              </button>
            ) : (
              ""
            )}
          </div>

          {winType !== 6 && (
            <div className="checkboxes">
              <div className="single-checkbox">
                <input
                  type="checkbox"
                  id="overlay-checkbox"
                  checked={showOveralay}
                  onChange={() => setShowOverlay((prevState) => !prevState)}
                />
                <label htmlFor="overlay-checkbox"> Sovraimpressione</label>
              </div>
              <div className="single-checkbox">
                <input
                  type="checkbox"
                  id="speech-checkbox"
                  checked={!isMute}
                  onChange={() => setIsMute((prevState) => !prevState)}
                />
                <label htmlFor="overlay-checkbox"> Parlato</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Buttons;
