import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicBookById, setCurrentPublicBook } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';

function PublicBookDetails() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.books);
  const [book, setBook] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const currentBook = state.publicBooks.find(book => book._id === id);
    if (state.publicBooks && currentBook) {
      setBook(currentBook);
    } else {
      dispatch(getPublicBookById(id));
    }
    return () => dispatch(setCurrentPublicBook(null));
  }, []);

  useEffect(() => {
    state.currentPublicBook && setBook(state.currentPublicBook);
  }, [state.currentPublicBook]);

  if (book) {
    return (
      <>
        <div className="dark:bg-slate-700 bg-gray-100 mx-10 sm:w-[50%] sm:mx-auto p-10 rounded-xl dark:text-white relative">
          <h2 className="text-center mb-2">{book.title}</h2>
          <img src={book.imageUrl} alt="" className="p-1 h-60 mx-auto border rounded-lg my-3" />
          <p>
            <span className="font-bold mr-1">authors:</span>
            {book.authors && book.authors !== 'N/A' ? book.authors.join(', ') : book.authors}
          </p>
          <p>
            <span className="font-bold mr-1">Publisher:</span>
            {book.publisher}
          </p>
          <p>
            <span className="font-bold mr-1">PublishedDate:</span> {book.publishedDate}
          </p>
          <p className="break-words">
            <span className="font-bold mr-1">Description:</span> {book.description}
          </p>
        </div>
      </>
    );
  }
}

export default PublicBookDetails;
