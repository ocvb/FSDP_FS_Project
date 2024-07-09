import { createContext, useState, useEffect, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
    children: any;
}

interface fetchAuthType {
    User: {
        createdAt?: string;
        id?: number;
        password?: string;
        role?: string;
        updatedAt?: string;
        username?: string;
        uuid?: string;
    } | null;
    isAuthenticated: boolean;
    userRole: string | null;
}

export interface AuthType {
    fetchAuth: fetchAuthType;
    login: (data: object) => Promise<{ result: boolean; path: string }>;
    logout: () => void;
    checkTokenIsValid: (token: string) => Promise<boolean>;
}

const AuthContext = createContext({} as AuthType);

export default function AuthProvider({ children }: AuthContextType) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [loginInEffect, setLoginInEffect] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenIsValid(token);
        }
    }, []);

    useEffect(() => {
        if (loginInEffect == false) {
            if (isAuthenticated && location.pathname === '/account') {
                if (userRole === 'Admin') {
                    return navigate('/account/admin', {
                        replace: true,
                    });
                } else {
                    return navigate('/account/profile', {
                        replace: true,
                    });
                }
            }
        }
    }, [isAuthenticated, userRole, location, loginInEffect, navigate]);

    const fetchAuth = {
        User: user,
        isAuthenticated: isAuthenticated,
        userRole: userRole,
    } as fetchAuthType;

    const checkTokenIsValid = async (token: string) => {
        return await axios
            .get('http://localhost:3001/api/user/auth', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser(response.data.data);
                    setUserRole(response.data.data.role);
                    localStorage.setItem('token', response.data.token);
                    console.log('tes?');
                    return true;
                } else {
                    setIsAuthenticated(false);
                    return false;
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                return false;
            });
    };

    const login = async (data: object) => {
        return await axios
            .post('http://localhost:3001/api/user/login', data)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser(response.data.data);
                    setUserRole(response.data.data.role);
                    setLoginInEffect(true);
                    localStorage.setItem('token', response.data.token);
                    const path =
                        response.data?.data.role === 'Admin'
                            ? '/account/admin'
                            : '/account/profile';

                    return { result: true, path: path };
                } else {
                    setIsAuthenticated(false);
                    setLoginInEffect(false);
                    return false;
                }
            })
            .catch((error) => {
                setIsAuthenticated(false);
                return error;
            });
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        return <Navigate to={'/account'} replace />;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                checkTokenIsValid,
                login,
                logout,
                fetchAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth() {
    return useContext(AuthContext);
}
