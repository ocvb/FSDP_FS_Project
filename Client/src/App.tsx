import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

// Components
import NavigationBar from '@components/Navbar/Navbar';
import NavbarAdmin from '@components/Navbar/NavbarAdmin';
import ProtectedRoute from '@components/Auth/RequireAuth';
import { UseAuth } from '@components/Auth/Auth';

// Routes
import Home from '@routes/Home/Home';
import Events from '@routes/Events/Events';
import Courses from '@routes/Courses/Courses';
import {
    EducationEnrichment,
    HealthWellness,
    LifeLongLearning,
    LifestyleLeisure,
    SportsFitness,
} from '@routes/Courses/pages/CoursePages';
import Account from '@routes/Account/Account';
import SkillShare from '@routes/SkillShare/SkillShare';

import Profile from '@routes/Account/Profile/Profile';

import Admin from '@routes/Account/Admin/Admin';

import logo from '@assets/Navbar/logo.png';

import './index.css';

import {
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function App() {
    const { fetchAuth } = UseAuth();
    const location = useLocation();
    const checkIfAdmin = fetchAuth.userRole === 'Admin';
    const isAdminRoute = location.pathname.includes('admin');

    const [mode, setMode] = useState<PaletteMode>('light');

    const theme = createTheme({
        palette: {
            mode: mode,
            background: {
                default: mode === 'light' ? '#ffffff' : '#000000',
            },
            text: {
                primary: mode === 'light' ? '#000000' : '#ffffff',
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {checkIfAdmin && isAdminRoute ? (
                    <NavbarAdmin logo={logo} />
                ) : (
                    <NavigationBar imgUrl={logo} />
                )}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/events' element={<Events />} />
                    <Route path='/courses/*' element={<Courses />} />
                    <Route path='/courses/*' element={<Outlet />}>
                        <Route
                            path='HealthWellness'
                            element={<HealthWellness />}
                        />
                        <Route
                            path='LifestyleLeisure'
                            element={<LifestyleLeisure />}
                        />
                        <Route
                            path='SportsFitness'
                            element={<SportsFitness />}
                        />
                        <Route
                            path='EducationEnrichment'
                            element={<EducationEnrichment />}
                        />
                        <Route
                            path='LifelongLearning'
                            element={<LifeLongLearning />}
                        />
                    </Route>
                    <Route path='/skill-share' element={<SkillShare />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/account/*' element={<ProtectedRoute />}>
                        <Route path='admin' element={<Admin />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    );
}
