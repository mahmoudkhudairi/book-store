import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getBookById, setCurrentBook } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';
import AddToFav from './AddToFav';
import DeleteBook from './DeleteBook';
import BookComments from './BookComments';
function BookDetails() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [book, setBook] = useState(null);
  const { state: locationState } = useLocation();
  const { id } = useParams();
  useEffect(() => {
    const currentBook = state.books.allBooks.find(book => book._id === id);
    if (state.books.allBooks && currentBook) {
      setBook(currentBook);
    } else {
      dispatch(getBookById(id));
    }

    return () => dispatch(setCurrentBook(null));
  }, []);

  useEffect(() => {
    state.books.currentBook && setBook(state.books.currentBook);
  }, [state.books.currentBook]);

  if (book) {
    return (
      <>
        <div className="dark:bg-slate-700 bg-gray-100 mx-10 sm:w-[50%] sm:mx-auto p-10 rounded-xl dark:text-white relative">
          <h2 className="text-center mb-2">{book.title}</h2>
          <AddToFav _id={book._id} book={book} user={state.user.user} isDetails={true} />
          <img src={book.imageUrl} alt="" className="p-1 h-60 mx-auto border rounded-lg my-3" />
          <p>authors: {book.authors && book.authors.join(', ')}</p>
          <p>Publisher: {book.publisher}</p>
          <p>PublishedDate: {book.publishedDate}</p>
          <p className="break-words">Description: {book.description}</p>
          {state.user.user._id === book.createdBy._id && (
            <div className="mt-4 flex w-[100%] justify-center gap-4">
              <Link
                to={`/books/${book._id}/edit`}
                state={book}
                className=" text-center rounded-lg px-2 py-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-green-100 duration-300 inline-block w-[80px]"
              >
                Edit
              </Link>

              <DeleteBook _id={id} isDetails={true} />
            </div>
          )}
        </div>
        <BookComments bookId={id} />
      </>
    );
  }
}

export default BookDetails;
