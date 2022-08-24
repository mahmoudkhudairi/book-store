import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import AddBook from './AddBook';
import BookDetails from './BookDetails';
import UpdateBook from './UpdateBook';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import ErrorAlert from './ErrorAlert';
import AdminDashboard from './AdminDashboard';
import PublicBookDetails from './PublicBookDetails';
function Main() {
  const state = useSelector(state => state);
  return (
    <div className="pb-[110px]">
      {state.user.error && <ErrorAlert error={state.user.error} />}
      {state.books.error && <ErrorAlert error={state.books.error} />}
      {(state.user.loading || state.books.loading) && <Spinner />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/public-books/:id" element={<PublicBookDetails />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route path="/books" element={<ProtectedRoute />}>
          <Route path="new" element={<AddBook />} />
          <Route path="" element={<Feed />} />
          <Route path=":id" element={<BookDetails />} />
          <Route path=":id/edit/" element={<UpdateBook />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Main;
