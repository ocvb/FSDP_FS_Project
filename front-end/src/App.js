import logo from "./logo.svg";
import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  // Call the function
  React.useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.log(res); // Log the raw response
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{!data ? "Loading..." : data}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
