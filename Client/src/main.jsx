import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Load Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

// Components
import NavigationBar from "./components/Navbar/Navbar.module";

// Routes
import Home from "./routes/Home/Home";
import Events from "./routes/Events/Events";
import Account from "./routes/Account/Account";

import Profile from './routes/Account/Profile/Profile';
import ProfileNotifications from './routes/Account/Profile/Notifications';
// import { ProfileEvents } from './routes/Account/Profile/Events';

// Logo
import logo from "./assets/Navbar/logo.png";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <NavigationBar imgUrl={logo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/account/" element={<Account />} />
        <Route path="/account/profile/" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);