import { createContext, useState, useRef } from "react";
import { numberExtraction } from "../util/numberExtraction";
import { chooseCartella, chooseRowCartella } from "../util/selectCartella";
import { speakNow } from "../util/speakNow";

export const NumberContext = createContext();

export default function NumberProvider({ children }) {
  const [isCalled, setIsCalled] = useState([
    { r0: [], r1: [], r2: [] },
    { r0: [], r1: [], r2: [] },
    { r0: [], r1: [], r2: [] },
    { r0: [], r1: [], r2: [] },
    { r0: [], r1: [], r2: [] },
    { r0: [], r1: [], r2: [] },
  ]);

  const thisGameNumbers = useRef([]); // memorizzo il pool dei numeri estratti in questa partita su una Ref
  const indexOfExtracted = useRef(-1); //indice estrazione corrente
  const winType = useRef(1);
  const winningList = [
    null,
    "AMBO",
    "TERNO",
    "QUATERNA",
    "CINQUINA",
    "TOMBOLA",
  ];
  const winningArray = useRef([]);

  const startGame = () => {
    thisGameNumbers.current = numberExtraction(90);
    setIsCalled([
      { r0: [], r1: [], r2: [] },
      { r0: [], r1: [], r2: [] },
      { r0: [], r1: [], r2: [] },
      { r0: [], r1: [], r2: [] },
      { r0: [], r1: [], r2: [] },
      { r0: [], r1: [], r2: [] },
    ]);
    console.log("Partita inizializzata!");
  };

  const callNumbers = () => {
    if (!!thisGameNumbers) {
      if (indexOfExtracted.current < 89) {
        indexOfExtracted.current++;
        let extracted =
          thisGameNumbers.current.numbers[indexOfExtracted.current];
        speakNow(extracted);
        let cartella = chooseCartella(extracted); //cerco cartella su cui memorizzare
        let riga = chooseRowCartella(extracted); //cerco riga su cui memorizzare
        let backupObjArray = JSON.parse(JSON.stringify(isCalled)); //TROVARE ALTRA SOLUZIONE QUI, NON VA BENE!?!?!?!?
        backupObjArray[cartella][riga].push(extracted); //aggiungo l'estratto
        setIsCalled(backupObjArray);

        const currentWin = winCheck(cartella, riga, extracted);
        if (currentWin) {
          //controllo se c'è una vincita
          winningArray.current.push(currentWin); //creo un array con storico vincite

          speakNow(currentWin.winType);
          console.log("Ultime vincite: ", winningArray.current);
        }
      } else console.log("Ultimo numero già estratto!");
    } else console.log("Devi prima inizializzare la partita!");
  };

  const searchNumber = (number) => {
    return thisGameNumbers.current.numbers.indexOf(number) + 1;
  };

  const winCheck = (cartella, riga, lastNumber) => {
    if (winType.current < 5) {
      let length = isCalled[cartella][riga].length + 1;
      if (length === winType.current + 1) {
        winType.current++;
        return {
          winType: winningList[winType.current - 1],
          cartella,
          riga,
          vincenti: [...isCalled[cartella][riga], lastNumber],
          index: indexOfExtracted.current,
        };
      }
    } else {
      let length = [];
      const correctionIndex = ["r0", "r1", "r2"].indexOf(riga);

      length[0] = isCalled[cartella]["r0"].length;
      length[1] = isCalled[cartella]["r1"].length;
      length[2] = isCalled[cartella]["r2"].length;

      length[correctionIndex]++; // aggiungo 1 perchè useState non si è ancora aggiornato e non voglio usare useEffect

      if (length[0] === 5 && length[1] === 5 && length[2] === 5)
        return {
          winType: winningList[winType.current],
          cartella,
          riga,
          vincenti: [isCalled[cartella], lastNumber],
          index: indexOfExtracted.current,
        };
    }
    return false;
  };

  return (
    <NumberContext.Provider
      value={{
        isCalled,
        setIsCalled,
        startGame,
        callNumbers,
        searchNumber,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}
