import { createContext, useState, useEffect, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { callAPI } from '@api/EndpointsQueries';
import { UsersDataResponse } from '@api/ApiType';

interface AuthContextType {
    children: React.ReactNode;
}

interface fetchAuthType {
    User?: {
        createdAt?: string;
        id?: number;
        password?: string;
        role?: string;
        updatedAt?: string;
        username?: string;
        uuid?: string;
    };
    isAuthenticated?: boolean;
    userRole?: string | null;
}

export interface AuthType {
    user: UsersDataResponse['data'];
    isAuthenticated: boolean;
    fetchAuth: fetchAuthType;
    login: (data: object) => Promise<{ result: boolean; path: string }>;
    logout: () => void;
    checkTokenIsValid: (token: string) => Promise<boolean>;
}

const AuthContext = createContext({} as AuthType);

export default function AuthProvider({ children }: AuthContextType) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({
        createdAt: '',
        id: 0,
        password: '',
        role: '',
        updatedAt: '',
        username: '',
        uuid: '',
    } as UsersDataResponse['data']);
    const [userRole, setUserRole] = useState('');
    const [loginInEffect, setLoginInEffect] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenIsValid(token).catch(() => {
                setIsAuthenticated(false);
            });
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
        return await callAPI
            .get<UsersDataResponse>('/api/user/auth', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const responseData = response?.data;
                    setIsAuthenticated(true);
                    setUser(responseData.data ?? {});
                    setUserRole(responseData?.data?.role ?? '');
                    localStorage.setItem('token', responseData?.token ?? '');
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

    const login = async (
        data: object
    ): Promise<{ result: boolean; path: string }> => {
        return await callAPI
            .post<UsersDataResponse>('/api/user/login', data)
            .then((response) => {
                if (response.status === 200) {
                    const responseData = response?.data;
                    setIsAuthenticated(true);
                    setUser(responseData?.data);
                    setUserRole(responseData?.data?.role ?? '');
                    setLoginInEffect(true);
                    localStorage.setItem('token', responseData?.token ?? '');
                    const path =
                        responseData?.data?.role === 'Admin'
                            ? '/account/admin'
                            : '/account/profile';

                    return { result: true, path: path };
                } else {
                    setIsAuthenticated(false);
                    setLoginInEffect(false);
                    return { result: false, path: '' };
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                return { result: false, path: '' };
            });
    };

    const logout = () => {
        setUser({});
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
