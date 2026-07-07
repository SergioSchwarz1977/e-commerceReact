import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const RouteProtected = ({ children, rolesPermitidos }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

