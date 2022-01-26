import "./App.css";
import Cartellone from "./components/Cartellone/Cartellone";
import Buttons from "./components/Buttons/Buttons";
import NumberProvider from "./context/Numbers";
import LastExtracted from "./components/LastExtracted/LastExtracted";
import NumberOverlay from "./components/NumberOverlay/NumberOverlay";
import WinNotification from "./components/WInNotification/WinNotification";

function App() { 
  return (
    <NumberProvider>
      <div className="page-wrapper">
        <main>
          <aside className="left">
            <h1>Tombola 2022</h1>
            <LastExtracted />
          </aside>
          <section className="main-content">
            <div className="cartellone-wrapper">
              <Cartellone />
            </div>
            <NumberOverlay />
          </section>
          <WinNotification />
        </main>
        <footer className="footer-wrapper">
          <Buttons />
        </footer>
      </div>
    </NumberProvider>
  );
}

export default App;
