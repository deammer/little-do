import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Little Do</p>
        <label>
          <input type="checkbox" />
          <span>Build this todo list</span>
        </label>
      </header>
    </div>
  );
}

export default App;
