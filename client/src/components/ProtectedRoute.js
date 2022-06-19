import { useEffect, useState } from 'react';
import { useBooksContext } from '../context';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const {
    state: { user },
  } = useBooksContext();
  useEffect(() => {
    setIsAuthorized(false);
  }, [user]);

  return <>{isAuthorized ? <></> : <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>;
};

export default ProtectedRoute;
