import React from "react";
import "./winNotification.css";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";

const WinNotification = () => {
  const { winningArray } = useContext(NumberContext);
  return (
    <div className="aside-overlay">
      {winningArray.current.map((el, i) => (
        <li key={i}>
          <SingleWinNotification i={i} />
        </li>
      ))}
    </div>
  );
};
export default WinNotification;

const SingleWinNotification = ({ i }) => {
  const { winningArray } = useContext(NumberContext);
  return (
    <>
      <div className="aside-notification">
        <div className="notification-logo">
          <i className="fas fa-trophy"></i>
          <div className="number-extraction">{winningArray.current[i].indiceNumeroEstratto+1}{"°"}</div>
        </div>
        <div className="winning-numbers">
          <div className="winning-header">
            {winningArray.current[i].winType}
          </div>
          <div className="winning-body">
            {winningArray.current[i].vincenti.map((el, index) => (
              <span key={index}>
                {el}{" "}
                {index < winningArray.current[i].vincenti.length - 1
                  ? " - "
                  : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="close-notification">
          <i
            className="far fa-window-close"
            onClick={() => alert("Ancora non implementato")}
          ></i>
        </div>
      </div>
      <div></div>
    </>
  );
};
