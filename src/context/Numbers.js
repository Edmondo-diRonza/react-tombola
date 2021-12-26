import { createContext, useState } from "react";
import { numberExtraction } from "../mock/numberExtraction";

export const NumberContext = createContext();

export default function NumberProvider({ children }) {
  const [isCalled, setIsCalled] = useState([
    { row1: [], row2: [], row3: [] },
    { row1: [], row2: [], row3: [] },
    { row1: [], row2: [], row3: [] },
    { row1: [], row2: [], row3: [] },
    { row1: [], row2: [], row3: [] },
    { row1: [], row2: [], row3: [] },
  ]);
  const extractedNumber = numberExtraction(90);
  console.log("Extraced Number", extractedNumber);

  return (
    <NumberContext.Provider value={{ isCalled, setIsCalled }}>
      {children}
    </NumberContext.Provider>
  );
}
