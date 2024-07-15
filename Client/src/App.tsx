import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

// Components
import NavigationBar from '@components/Navbar/Navbar';
import NavbarAdmin from '@components/Navbar/NavbarAdmin';
import { UseAuth } from '@components/Auth/Auth';
import ProtectedRoute from '@/components/Auth/RequireAuth';

// Routes
import Home from '@routes/Home/Home';
import Events from '@routes/Events/Events';
import Courses from '@routes/Courses/Courses';
import { HealthWellness } from '@routes/Courses/pages/CoursePages';
import Account from '@routes/Account/Account';
import SkillShare from '@routes/SkillShare/SkillShare';

import Profile from '@routes/Account/Profile/Profile';

import Admin from '@routes/Account/Admin/Admin';

import logo from '@assets/Navbar/logo.png';

import './index.css';
import { headerFilteringStateInitializer } from '@mui/x-data-grid/internals';

export default function App() {
    const { fetchAuth } = UseAuth();
    const location = useLocation();
    const checkIfAdmin = fetchAuth.userRole === 'Admin';
    const isAdminRoute = location.pathname.includes('admin');
    return (
        <>
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
                    <Route path='HealthWellness' element={<HealthWellness />} />
                </Route>
                <Route path='/skill-share' element={<SkillShare />} />
                <Route path='/account' element={<Account />} />
                <Route path='/account/*' element={<ProtectedRoute />}>
                    <Route path='admin' element={<Admin />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
}
