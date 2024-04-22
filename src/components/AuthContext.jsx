import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });    

    const login = (token, userData) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);
        setUserToken(token);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
