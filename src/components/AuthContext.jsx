import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [userAdmin, setUserAdmin] = useState(localStorage.getItem('userAdmin'));

    const login = (token, userData, admin) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userAdmin', admin);
        setUserData(userData);
        setUserToken(token);
        setUserAdmin(admin);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userAdmin');
        setUserToken(null);
        setUserAdmin(null);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, userData, userAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
