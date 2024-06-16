import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(useAuthContext); 

  return (
    <Route
      {...rest}
      element={(props) =>
        user ? <Element {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default ProtectedRoute;
