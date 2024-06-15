import { Route, Routes, useLocation } from "react-router-dom";

// Components
import NavigationBar from "@/components/Navbar/Navbar.module";
import NavbarAdmin from "./components/Navbar/NavbarAdmin.module";
import { UseAuth } from "@/components/Auth/Auth";
import ProtectedRoute from "@/components/Auth/RequireAuth";

// Routes
import Home from "./routes/Home/Home";
import Events from "./routes/Events/Events";
import Account from "./routes/Account/Account";

import Profile from './routes/Account/Profile/Profile';

import Admin from './routes/Account/Admin/Admin';

import logo from "@/assets/Navbar/logo.png";

import './index.css'

export default function App() {
  const { fetchAuth } = UseAuth();
  const location = useLocation();
  const checkIfAdmin = fetchAuth().userRole === "admin";
  const isAdminRoute = location.pathname.includes("admin");
  return (
    <>
      {checkIfAdmin && isAdminRoute ? <NavbarAdmin logo={logo} /> : <NavigationBar imgUrl={logo} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/*" element={<ProtectedRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}