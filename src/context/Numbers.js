import { createContext, useState, useRef } from "react";
import { numberExtraction } from "../util/numberExtraction";
import { chooseCartella, chooseRowCartella } from "../util/selectCartella";
import { speakNow } from "../util/speakNow";

export const NumberContext = createContext();

export default function NumberProvider({ children }) {
  const [isCalled, setIsCalled] = useState([]); // Stato aggiornamento delle cartelle e per le vincite
  const thisGameNumbers = useRef({ numbers: false }); // pool di tutti i numeri estratti all'inizializzazione della partita
  const indexOfExtracted = useRef(false); //indice avanzamento estrazione corrente
  const winType = useRef(1); // Ref avanzamento vincite tabellone
  const winningList = [
    null,
    "AMBO",
    "TERNO",
    "QUATERNA",
    "CINQUINA",
    "TOMBOLA",
  ]; // Array col nome delle vincite
  const winningArray = useRef([]); // array in cui salvo gli eventi di vincita del tabellone

  const [showOverlay, setShowOverlay] = useState({
    overlay: "overlay-layer hide",
    bigNumber: "big-number hide",
  }); // visualizzazione overlay

  const myInterval = useRef(false); //intervallo estrazione automatica

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
    indexOfExtracted.current = -1; //azzero l'indice di estrazione
    speakNow("Partita inizializzata");
    console.log("Partita inizializzata!");
  };

  const callNumbers = () => {
    if (thisGameNumbers.current.numbers) {
      if (winType.current !== 6) {
        if (indexOfExtracted.current < 89) {
          indexOfExtracted.current++;
          let extracted =
            thisGameNumbers.current.numbers[indexOfExtracted.current];
          //creare una funzione e migliorare l'uscita dell'overlay
          setShowOverlay({
            overlay: "overlay-layer",
            bigNumber: "big-number",
          });
          setTimeout(() => {
            setShowOverlay({
              overlay: "overlay-layer hide",
              bigNumber: "big-number hide",
            });
          }, 5000);

          speakNow(extracted);
          //cerco riga e cartella dove andranno memorizzati tramite funzioni su util
          let cartella = chooseCartella(extracted);
          let riga = chooseRowCartella(extracted);

          //adesso controllo NON sia duplicato a causa del tasto step backward ed eventualmente memorizzo e controllo vincite
          if (!isCalled[cartella][riga].includes(extracted)) {
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
          }
        } else console.log("Ultimo numero già estratto!");
      } else console.log("Partita terminata, hai già fatto tombola!");
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
          indiceNumeroEstratto: indexOfExtracted.current,
        };
      }
    } else {
      let length = [];
      const correctionIndex = ["r0", "r1", "r2"].indexOf(riga);
      length[0] = isCalled[cartella]["r0"].length;
      length[1] = isCalled[cartella]["r1"].length;
      length[2] = isCalled[cartella]["r2"].length;
      length[correctionIndex]++; // aggiungo 1 perchè useState non si è ancora aggiornato e non voglio usare useEffect

      if (length[0] === 5 && length[1] === 5 && length[2] === 5) {
        winType.current++;
        return {
          winType: winningList[winType.current - 1],
          cartella,
          riga,
          vincenti: [
            ...isCalled[cartella]["r0"],
            ...isCalled[cartella]["r1"],
            ...isCalled[cartella]["r2"],
            lastNumber,
          ],
          indiceNumeroEstratto: indexOfExtracted.current,
        };
      }
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
        thisGameNumbers,
        indexOfExtracted,
        showOverlay,
        winType,
        myInterval,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}
