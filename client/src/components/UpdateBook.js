import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Form from './Form';
import { useBooksContext } from '../context';
function UpdateBook() {
  const [oldBook, setOldBook] = useState(null);
  const { id } = useParams();
  const { state } = useLocation();
  const { getBookById } = useBooksContext();
  useEffect(() => {
    if (!state) {
      getBookById(id).then((book) => setOldBook(book));
    } else {
      setOldBook(state);
    }
  }, []);

  return <Form buttonText={'Update Book'} oldBook={oldBook} />;
}

export default UpdateBook;
