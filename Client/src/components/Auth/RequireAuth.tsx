import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UseAuth } from './Auth';
export default function ProtectedRoute() {
    const { fetchAuth } = UseAuth();
    const location = useLocation();
    return fetchAuth.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/account' replace state={{ path: location.pathname }} />
    );
}
