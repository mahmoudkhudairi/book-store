import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Form from './Form';
import { getBookById } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';
function UpdateBook() {
  const [oldBook, setOldBook] = useState(null);
  const { id } = useParams();
  const { state: locationState } = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(state => state.books);
  useEffect(() => {
    setOldBook(state.currentBook);
  }, [state.currentBook]);

  useEffect(() => {
    if (!locationState) {
      dispatch(getBookById(id));
    } else {
      setOldBook(locationState);
    }
  }, []);

  return <Form buttonText={'Update Book'} oldBook={oldBook} />;
}

export default UpdateBook;
