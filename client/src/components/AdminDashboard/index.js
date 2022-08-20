import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from './Table';

const AdminDashboard = () => {
  const state = useSelector(state => {
    return state.user;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user && state.user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [state.user]);

  return (
    <>
      <div className="container mx-auto">{!state.error && <Table />}</div>
    </>
  );
};

export default AdminDashboard;
