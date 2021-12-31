import React from "react";
import NumberItem from "../NumberItem/NumberItem";
import "./cartella.css";
import { useContext } from "react";
import { NumberContext } from "../../context/Numbers";

const Cartella = ({ offset, cartella }) => {
  const { isCalled } = useContext(NumberContext);
  return (
    <div className="cartella">
      <div className="row">
        <NumberItem
          value={offset + 1}
          isCalled={isCalled[cartella].r0.includes(offset + 1)}
        />
        <NumberItem
          value={offset + 2}
          isCalled={isCalled[cartella].r0.includes(offset + 2)}
        />
        <NumberItem
          value={offset + 3}
          isCalled={isCalled[cartella].r0.includes(offset + 3)}
        />
        <NumberItem
          value={offset + 4}
          isCalled={isCalled[cartella].r0.includes(offset + 4)}
        />
        <NumberItem
          value={offset + 5}
          isCalled={isCalled[cartella].r0.includes(offset + 5)}
        />
      </div>
      <div className="row">
        <NumberItem
          value={offset + 11}
          isCalled={isCalled[cartella].r1.includes(offset + 11)}
        />
        <NumberItem
          value={offset + 12}
          isCalled={isCalled[cartella].r1.includes(offset + 12)}
        />
        <NumberItem
          value={offset + 13}
          isCalled={isCalled[cartella].r1.includes(offset + 13)}
        />
        <NumberItem
          value={offset + 14}
          isCalled={isCalled[cartella].r1.includes(offset + 14)}
        />
        <NumberItem
          value={offset + 15}
          isCalled={isCalled[cartella].r1.includes(offset + 15)}
        />
      </div>
      <div className="row">
        <NumberItem
          value={offset + 21}
          isCalled={isCalled[cartella].r2.includes(offset + 21)}
        />
        <NumberItem
          value={offset + 22}
          isCalled={isCalled[cartella].r2.includes(offset + 22)}
        />
        <NumberItem
          value={offset + 23}
          isCalled={isCalled[cartella].r2.includes(offset + 23)}
        />
        <NumberItem
          value={offset + 24}
          isCalled={isCalled[cartella].r2.includes(offset + 24)}
        />
        <NumberItem
          value={offset + 25}
          isCalled={isCalled[cartella].r2.includes(offset + 25)}
        />
      </div>
    </div>
  );
};

export default Cartella;
