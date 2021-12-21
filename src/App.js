import "./App.css";
import Cartella from "./components/Cartella";
import { numberExtraction } from "./mock/numberExtraction";

function App() {
  console.log(numberExtraction(90));
  return (
    <div className="page-wrapper">
      <main>
        <aside>
          <h2>Tombola 2022</h2>
        </aside>
        <section className="main-content">
          <div className="row-cartella">
            <Cartella offset={0} />
            <Cartella offset={5} />
          </div>
          <div className="row-cartella">
            <Cartella offset={30} />
            <Cartella offset={35} />
          </div>
          <div className="row-cartella">
            <Cartella offset={60} />
            <Cartella offset={65} />
          </div>
        </section>
      </main>
      <footer className="footer-wrapper"></footer>
    </div>
  );
}

export default App;
