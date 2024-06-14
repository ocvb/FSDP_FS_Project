import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UseAuth } from '@/components/Auth/Auth';
export default function ProtectedRoute() {
    const { isAuthenticated } = UseAuth();
    const location = useLocation();

    return isAuthenticated ? <Outlet /> : <Navigate to="/account" replace state={{ path: location.pathname }} />;
}   