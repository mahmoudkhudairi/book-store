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
    <div className="flex flex-wrap gap-10 justify-around mx-5">
      {!books && loading ? (
        <div className="text-center dark:bg-slate-700 bg-white mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl dark:text-white relative">
          No books added yet :(
          <Link className="block mt-2 text-teal-500 hover:underline" to="/books/new">
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
