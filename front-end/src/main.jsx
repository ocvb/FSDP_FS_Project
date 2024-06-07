import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Load Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Componenst
import NavigationBar from "./components/Navbar/Navbar.module";
import Home from "./routes/Home/Home";

// Logo
import logo from "./assets/Navbar/logo.png";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <NavigationBar imgUrl={logo}/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
