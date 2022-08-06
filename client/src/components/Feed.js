import React, { useEffect } from 'react';
import Book from './Book';
import Placeholder from './Placeholder';
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
      {books && (
        <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {books.map((book) => (
            <Book book={book} isFeed={true} key={book._id} />
          ))}
        </div>
      )}
      {!loading && !books && (
        <Placeholder text="No books added yet :(" buttonText="Add a new Book" link="/books/new" />
      )}
    </>
  );
};

export default Feed;
