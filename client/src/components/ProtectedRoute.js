import { useEffect, useState } from 'react';
import { useBooksContext } from '../context';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
const ProtectedRoute = () => {
  let location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {
    state: { user },
  } = useBooksContext();
  useEffect(() => {
    if (user !== 'pre-fetch') {
      setIsAuthorized(true);
    }
  }, [user]);

  return (
    <>
      {isAuthorized && (
        <>{user ? <Outlet /> : <Navigate to="/login" state={{ destination: location }} />}</>
      )}
    </>
  );
};

export default ProtectedRoute;
