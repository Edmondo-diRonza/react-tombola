import "./App.css";
import Cartellone from "./components/Cartellone/Cartellone";
import Buttons from "./components/Buttons/Buttons";
import NumberProvider from "./context/Numbers";
import LastExtracted from "./components/LastExtracted/LastExtracted";

function App() {
  console.log(window.screen.availWidth,window.screen.availHeight );
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
