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
import { useBooksContext } from '../context/';
import ErrorAlert from './ErrorAlert';
function Main() {
  const {
    state: { loading, error },
  } = useBooksContext();

  return (
    <div className="min-h-screen">
      {error && <ErrorAlert message={error} />}
      {loading && <Spinner />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route path="/books" element={<ProtectedRoute />}>
          <Route path="new" element={<AddBook />} />
          <Route path="" element={<Feed />} />
          <Route path=":id" element={<BookDetails />} />
          <Route path=":id/edit/" element={<UpdateBook />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Main;
