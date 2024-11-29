// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'freelancer' | 'employer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted URL
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user has the correct role for this route
  if (user?.role !== allowedRole) {
    // Redirect to the appropriate homepage based on user's role
    return <Navigate to={`/${user?.role}/home`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;