import { createContext, useState } from "react";
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

  const [thisGameNumbers, setThisGameNumbers] = useState(); // memorizzo il pool dei numeri estratti in questa partita

  const [indexOfExtracted, setIndexOfExtracted] = useState(0); //indice estrazione corrente

  const startGame = () => {
    setThisGameNumbers(numberExtraction(90));
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

  const winCheck = (cartella, riga, number = 2) => {
    console.log(isCalled[cartella][riga].length);
  };

  const callNumbers = () => {
    if (!!thisGameNumbers) {
      if (indexOfExtracted <= 89) {
        setIndexOfExtracted(indexOfExtracted + 1);
        let extracted = thisGameNumbers.numbers[indexOfExtracted];
        speakNow(extracted);
        let cartella = chooseCartella(extracted); //cerco cartella su cui memorizzare
        let riga = chooseRowCartella(extracted); //cerco riga su cui memorizzare

        let backupObjArray = JSON.parse(JSON.stringify(isCalled)); //TROVARE ALTRA SOLUZIONE QUI, NON VA BENE!?!?!?!?

        backupObjArray[cartella][riga].push(extracted); //aggiungo l'estratto
        setIsCalled(backupObjArray);
      } else console.log("Ultimo numero già estratto!");
    } else console.log("Devi prima inizializzare la partita!");
  };

  const searchNumber = (number) => {
    return thisGameNumbers.numbers.indexOf(number) + 1;
  };

  return (
    <NumberContext.Provider
      value={{
        isCalled,
        setIsCalled,
        startGame,
        callNumbers,
        winCheck,
        searchNumber,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}
