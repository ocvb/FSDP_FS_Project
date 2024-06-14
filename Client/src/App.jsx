import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import NavigationBar from "@/components/Navbar/Navbar.module";
import AuthProvider from "@/components/Auth/Auth";
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
  return (
    <BrowserRouter>
      <NavigationBar imgUrl={logo} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/*" element={<ProtectedRoute />}>
            <Route path="admin" element={<Admin />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  )
}