import "./App.css";
import Cartella from "./components/Cartella";
import NumberProvider from "./context/Numbers";

function App() {
  return (
    <NumberProvider>
      <div className="page-wrapper">
        <main>
          <aside>
            <h2>Tombola 2022</h2>
          </aside>
          <section className="main-content">
            <div className="row-cartella">
              <Cartella offset={0} cartella={0} />
              <Cartella offset={5} cartella={1}/>
            </div>
            <div className="row-cartella">
              <Cartella offset={30} cartella={2}/>
              <Cartella offset={35} cartella={3}/>
            </div>
            <div className="row-cartella">
              <Cartella offset={60} cartella={4}/>
              <Cartella offset={65} cartella={5}/>
            </div>
          </section>
        </main>
        <footer className="footer-wrapper"></footer>
      </div>
    </NumberProvider>
  );
}

export default App;
