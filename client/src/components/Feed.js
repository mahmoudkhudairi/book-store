import React, { useEffect } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../context';
const Feed = (props) => {
  const {
    state: { books, loading },
    getBooks,
  } = useBooksContext();

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {!books && loading ? (
        <div className="text-center dark:bg-slate-700 bg-gray-100 mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl dark:text-white relative">
          No books added yet :(
          <Link className="block mt-2 text-catalina-blue-500 hover:underline" to="/books/new">
            Add a new Book
          </Link>
        </div>
      ) : (
        books.map((book) => <Book book={book} isFeed={true} key={book._id} />)
      )}
    </div>
  );
};

export default Feed;
