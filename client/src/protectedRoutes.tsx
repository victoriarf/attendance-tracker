import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoutes = () => {
  const { userValue } = useContext(AuthContext);
  return userValue ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
