import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './Auth';

export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated()) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }
    return children;
};

export const ProtectedAdmin = ({ children }) => {
    const location = useLocation();
    if (!isAdmin()) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }
    return children;
};

