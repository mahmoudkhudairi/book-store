import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../../context';
import Table from './Table';

const AdminDashboard = () => {
  const {
    state: { user, error },
  } = useBooksContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <div className="container mx-auto">{!error && <Table />}</div>
    </>
  );
};

export default AdminDashboard;
