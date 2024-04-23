import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './Auth';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated()) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
