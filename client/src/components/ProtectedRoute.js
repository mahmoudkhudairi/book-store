import { useGetContext } from '../context';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const {
    state: { user },
  } = useGetContext();
  return user && <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
