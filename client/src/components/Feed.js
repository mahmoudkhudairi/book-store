import React, { useState, useEffect } from 'react';
import Book from './Book';
import Placeholder from './Placeholder';
import { useBooksContext } from '../context';
const Feed = (props) => {
  const {
    state: { books, loading },
    getBooks,
  } = useBooksContext();
  const [page, setPage] = useState(0);
  useEffect(() => {
    getBooks(page);
  }, [page]);

  window.onscroll = function () {
    // check if the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log('BRING MORE!!!');
      setPage(page + 1);
    }
  };
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
