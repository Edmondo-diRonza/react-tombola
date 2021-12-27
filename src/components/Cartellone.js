import React from "react";
import Cartella from "./Cartella";

const Cartellone = () => {
  return (
    <>
      <div className="row-cartella">
        <Cartella offset={0} cartella={0} />
        <Cartella offset={5} cartella={1} />
      </div>
      <div className="row-cartella">
        <Cartella offset={30} cartella={2} />
        <Cartella offset={35} cartella={3} />
      </div>
      <div className="row-cartella">
        <Cartella offset={60} cartella={4} />
        <Cartella offset={65} cartella={5} />
      </div>
    </>
  );
};

export default Cartellone;
