import "./winNotification.css";
import { useContext, useEffect, useState } from "react";
import { NumberContext } from "../../context/Numbers";

const WinNotification = () => {
  // const vw = window.screen.availWidth;
  const { winningArray } = useContext(NumberContext);
  const [toRemove, setToRemove] = useState([]);
  useEffect(() => {
    if (winningArray.current.length === 0) {
      setToRemove([]);
    }
  }, [winningArray.current]);
  return (
    <div className="aside-overlay">
      {winningArray.current
        .filter((el) => !toRemove.includes(el.winType))
        .map((singleWin, i) => (
          <li key={i}>
            <SingleWinNotification
              winObj={singleWin}
              i={i}
              itemToRemove={(winType) => {
                if (!toRemove.includes(winType)) {
                  const backupArray = [...toRemove];
                  backupArray.push(winType);
                  setToRemove(backupArray);
                }
              }}
            />
          </li>
        ))}
    </div>
  );
};
export default WinNotification;

const SingleWinNotification = ({ i, itemToRemove, winObj }) => {
  return (
    <>
      <div className="aside-notification">
        <div className="notification-logo">
          <i className="fas fa-trophy"></i>
          <div className="number-extraction">
            {winObj.indiceNumeroEstratto + 1}
            {"°"}
          </div>
        </div>
        <div className="winning-numbers">
          {<div className="winning-header">{winObj.winType}</div>}
          <div className="winning-body">
            {winObj.vincenti.map((el, index) => (
              <span key={index}>
                {el} {index < winObj.vincenti.length - 1 ? "-" : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="close-notification">
          <i
            className="far fa-window-close"
            onClick={() => itemToRemove(winObj.winType)}
          ></i>
        </div>
      </div>
      <div></div>
    </>
  );
};
