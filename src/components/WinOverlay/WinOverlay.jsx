import React from "react";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";
import "./winOverlay.css";

const WinOverlay = () => {
  const { winningList, winType, showOverlay } = useContext(NumberContext);
  return (
    <>
      <div className={showOverlay.winLayer}>{winningList[winType - 1]}</div>
    </>
  );
};

export default WinOverlay;
