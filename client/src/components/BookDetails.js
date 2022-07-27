import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useBooksContext } from '../context';
import AddToFav from './AddToFav';
import DeleteBook from './DeleteBook';
function BookDetails() {
  const { state, getBookById } = useBooksContext();
  const [book, setBook] = useState(null);
  const {
    state: { isPublicBook },
  } = useLocation();
  const { id } = useParams();
  useEffect(() => {
    if (isPublicBook) {
      const book = state.publicBooks.find((book) => book._id === id);
      setBook(book);
    } else {
      const book = state.books.find((book) => book._id === id);
      if (state.books && book) {
        setBook(book);
      } else {
        getBookById(id).then((book) => setBook(book));
      }
    }
  }, []);

  if (book) {
    return (
      <div className="dark:bg-slate-700 bg-gray-100 mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl dark:text-white relative">
        <h2 className="text-center mb-2">{book.title}</h2>
        {book.createdBy && (
          <AddToFav _id={book._id} book={book} user={state.user} isDetails={true} />
        )}
        <img src={book.imageUrl} alt="" className="p-1 h-60 mx-auto border rounded-lg my-3" />
        <p>authors: {book.authors && book.authors.join(', ')}</p>
        <p>Publisher: {book.publisher}</p>
        <p>PublishedDate: {book.publishedDate}</p>
        <p className="break-words">Description: {book.description}</p>
        {book.createdBy && state.user._id === book.createdBy._id && (
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
    );
  }
}

export default BookDetails;
