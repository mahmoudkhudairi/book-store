import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = () => {
  let location = useLocation();
  const state = useSelector(state => {
    return state.user;
  });
  if (state.user !== 'pending') {
    if (state.user) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" state={{ destination: location }} />;
    }
  }
};

export default ProtectedRoute;
