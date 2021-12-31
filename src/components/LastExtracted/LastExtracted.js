import React from "react";
import "./lastExtracted.css";
import { NumberContext } from "../../context/Numbers";
import { useContext } from "react";

const LastExtracted = () => {
  const { thisGameNumbers, indexOfExtracted } = useContext(NumberContext);
  const extractedNumbers = thisGameNumbers.current.numbers;
  const index = indexOfExtracted.current;

  return (
    <div>
      <h4>Ultimi numeri estratti:</h4>
      <ul className="number-list" id="last-numbers">
        {extractedNumbers
          ? extractedNumbers
              .filter((el, i) => i < index + 1)
              .map((el, i) => (
                <li key={i}>
                  <div className="numberlistitem">{el}</div>
                  <p>{i + 1}° estratto</p>
                </li>
              ))
          : ""}
      </ul>
    </div>
  );
};
export default LastExtracted;

// lastNumbers.innerHTML +=
//       "<li> <div class='numberlistitem'>" +
//       arrayNumeri[contatore] +
//       "</div> <p>" +
//       (contatore + 1) +
//       "° estratto </p> </li>";
