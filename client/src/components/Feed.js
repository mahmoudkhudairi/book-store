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
    <>
      {books.length > 0 ? (
        <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {books.map((book) => <Book book={book} isFeed={true} key={book._id} />)}
        </div>
      ) : (
        <div className="text-center bg-gray-200 dark:bg-slate-500 grid-col-1 p-8  dark:text-white text-black mx-10 md:w-[50%] md:mx-auto rounded-xl relative">
          No books added yet :(
          <Link className="block mt-2 text-catalina-blue-500 hover:underline" to="/books/new">
            Add a new Book
          </Link>
        </div>
      )}
    </>
  );
};

export default Feed;
