import { createContext, useState, useRef } from "react";
import { numberExtraction } from "../util/numberExtraction";
import { chooseCartella, chooseRowCartella } from "../util/selectCartella";
import { speakNow } from "../util/speakNow";

export const NumberContext = createContext();

export default function NumberProvider({ children }) {
  const [isCalled, setIsCalled] = useState([]); // Stato aggiornamento delle cartelle e per le vincite
  const thisGameNumbers = useRef({ numbers: false }); // pool di tutti i numeri estratti all'inizializzazione della partita
  const indexOfExtracted = useRef(false); //indice avanzamento estrazione corrente
  const [winType, setWinType] = useState(1); // State avanzamento vincite tabellone
  const winningList = [
    null,
    "AMBO",
    "TERNO",
    "QUATERNA",
    "CINQUINA",
    "TOMBOLA",
    "PARTITA CONCLUSA!",
  ]; // Array col nome delle vincite
  const winningArray = useRef([]); // array in cui salvo gli eventi di vincita del tabellone

  const [showOverlay, setShowOverlay] = useState({
    overlay: "overlay-layer hide",
    bigNumber: "big-number hide",
    winLayer: "winner-layer hide",
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
    setWinType(1);

    speakNow("Partita inizializzata");
    console.log("Partita inizializzata!");
  };

  const callNumbers = () => {
    if (thisGameNumbers.current.numbers) {
      if (winType !== 6) {
        if (indexOfExtracted.current < 89) {
          indexOfExtracted.current++;
          let extracted =
            thisGameNumbers.current.numbers[indexOfExtracted.current];
          //creare una funzione e migliorare l'uscita dell'overlay
          setShowOverlay({
            overlay: "overlay-layer",
            bigNumber: "big-number",
            winLayer: "winner-layer hide"
          });
          setTimeout(() => {
            setShowOverlay({
              overlay: "overlay-layer hide",
              bigNumber: "big-number hide",
              winLayer: "winner-layer hide"
            });
          }, 5000);

          speakNow(extracted);
          //cerco riga e cartella dove andranno memorizzati tramite funzioni su util
          let cartella = chooseCartella(extracted);
          let riga = chooseRowCartella(extracted);

          //adesso controllo NON sia duplicato a causa del tasto step backward ed eventualmente memorizzo e controllo vincite
          if (!isCalled[cartella][riga].includes(extracted)) {
            let arrayBackup = isCalled.map((el) => el);
            arrayBackup[cartella][riga].push(extracted);
            setIsCalled(arrayBackup);

            const currentWin = winCheck(cartella, riga, extracted);
            if (currentWin) {
              //controllo se c'è una vincita
              winningArray.current.push(currentWin); //creo un array con storico vincite

              clearInterval(myInterval.current); //fermo estrazione automatica
              myInterval.current = false; //riporto a false la ref dell'intervallo
              speakNow(currentWin.winType);
              setShowOverlay({
                overlay: "overlay-layer",
                bigNumber: "big-number hide",
                winLayer: "winner-layer"
              });
              setTimeout(() => {
                setShowOverlay({
                  overlay: "overlay-layer hide",
                  bigNumber: "big-number hide",
                  winLayer: "winner-layer hide"
                });
              }, 5000);

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

  const winCheck = (cartella, riga) => {
    if (winType < 5) {
      const length = isCalled[cartella][riga].length;
      if (length === winType + 1) {
        setWinType((prev) => prev + 1);
        return {
          winType: winningList[winType],
          cartella,
          riga,
          vincenti: [...isCalled[cartella][riga]],
          indiceNumeroEstratto: indexOfExtracted.current,
        };
      }
    } else {
      const length = [];
      length[0] = isCalled[cartella]["r0"].length;
      length[1] = isCalled[cartella]["r1"].length;
      length[2] = isCalled[cartella]["r2"].length;

      if (length[0] === 5 && length[1] === 5 && length[2] === 5) {
        setWinType((prev) => prev + 1);
        return {
          winType: winningList[winType],
          cartella,
          riga,
          vincenti: isCalled[cartella],
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
        winningList,
        setWinType,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}
