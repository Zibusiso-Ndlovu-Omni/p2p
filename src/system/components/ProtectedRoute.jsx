import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            setIsAuthenticated(false);
            setIsAuthorized(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userRoleId = decodedToken.role_id;

            setIsAuthenticated(true);

            if (allowedRoles && allowedRoles.length > 0) {
                const hasRequiredRole = allowedRoles.includes(userRoleId);
                setIsAuthorized(hasRequiredRole);
            } else {
                setIsAuthorized(true);
            }

        } catch (error) {
            console.error("Error decoding token or token invalid:", error);
            Cookies.remove('token');
            setIsAuthenticated(false);
            setIsAuthorized(false);
        }
    }, [allowedRoles]);

    if (isAuthenticated === null || isAuthorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
                <p className="ml-4 text-lg">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/access-denied" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;

