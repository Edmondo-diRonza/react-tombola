import "./App.css";
import Cartellone from "./components/Cartellone";
import Buttons from "./components/Buttons";
import NumberProvider from "./context/Numbers";
import LastExtracted from "./components/LastExtracted";

function App() {
  return (
    <NumberProvider>
      <div className="page-wrapper">
        <main>
          <aside>
            <h2>Tombola 2022</h2>
            <LastExtracted />
          </aside>
          <section className="main-content">
            <Cartellone />
          </section>
        </main>
        <footer className="footer-wrapper">
          <Buttons />
        </footer>
      </div>
    </NumberProvider>
  );
}

export default App;
