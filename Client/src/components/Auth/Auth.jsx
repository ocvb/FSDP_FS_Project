import { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenIsValid(token);
        }
    }, []);

    const fetchAuth = () => {
        const data = {
            User: user,
            isAuthenticated: isAuthenticated,
            userRole: userRole
        }
        return data;
    }

    const checkTokenIsValid = async (token) => {
        await axios.get("http://localhost:3001/api/user/auth", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.data);
                setUserRole(response.data.data.role);
                localStorage.setItem('token', response.data.token);
                return true;
            } else {
                setIsAuthenticated(false);
                return false;
            }
        }).catch((error) => {
            setIsAuthenticated(false);
            return false;
        });


    }

    const login = async (data) => {
        await axios.post("http://localhost:3001/api/user/login", data)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser(response.data.data);
                    setUserRole(response.data.data.role);
                    localStorage.setItem('token', response.data.token);
                    return true;
                } else {
                    setIsAuthenticated(false);
                    return false;
                }
            }).catch((error) => {
                setIsAuthenticated(false);
                return error;
            });
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        return <Navigate to={"/account"} />;
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, checkTokenIsValid, login, logout, fetchAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth() {
    return useContext(AuthContext);
}