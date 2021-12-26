import React from "react";
import NumberItem from "./NumberItem";
import "./cartella.css";
import { useContext } from "react";
import { NumberContext } from "../context/Numbers";

const Cartella = ({ offset, cartella }) => { 
  const calledNumbers = useContext(NumberContext);
  console.log('cartella ',cartella,calledNumbers.isCalled[cartella]);  
   
  return (
    <div className="cartella">
      <div className="row">
        <NumberItem value={offset + 1} isCalled={calledNumbers.isCalled[cartella].row1[0]} />
        <NumberItem value={offset + 2} isCalled={calledNumbers.isCalled[cartella].row1[1]}/>
        <NumberItem value={offset + 3} isCalled={calledNumbers.isCalled[cartella].row1[2]}/>
        <NumberItem value={offset + 4} isCalled={calledNumbers.isCalled[cartella].row1[3]}/>
        <NumberItem value={offset + 5} isCalled={calledNumbers.isCalled[cartella].row1[4]}/>
      </div>
      <div className="row">
        <NumberItem value={offset + 11} isCalled={calledNumbers.isCalled[cartella].row2[0]} />
        <NumberItem value={offset + 12} isCalled={calledNumbers.isCalled[cartella].row2[1]}/>
        <NumberItem value={offset + 13} isCalled={calledNumbers.isCalled[cartella].row2[2]}/>
        <NumberItem value={offset + 14} isCalled={calledNumbers.isCalled[cartella].row2[3]}/>
        <NumberItem value={offset + 15} isCalled={calledNumbers.isCalled[cartella].row2[4]}/>
      </div>
      <div className="row">
        <NumberItem value={offset + 21} isCalled={calledNumbers.isCalled[cartella].row3[0]}/>
        <NumberItem value={offset + 22} isCalled={calledNumbers.isCalled[cartella].row3[1]}/>
        <NumberItem value={offset + 23} isCalled={calledNumbers.isCalled[cartella].row3[2]}/>
        <NumberItem value={offset + 24} isCalled={calledNumbers.isCalled[cartella].row3[3]}/>
        <NumberItem value={offset + 25} isCalled={calledNumbers.isCalled[cartella].row3[4]}/>
      </div>
    </div>
  );
};

export default Cartella;
