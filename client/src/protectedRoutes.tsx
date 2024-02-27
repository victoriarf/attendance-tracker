import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Loading from './components/Loading';

const ProtectedRoutes = () => {
  const { userValue } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!userValue);
  }, [userValue]);

  return !loading ? userValue ? <Outlet /> : <Navigate to="/login" /> : <Loading></Loading>;
};

export default ProtectedRoutes;
