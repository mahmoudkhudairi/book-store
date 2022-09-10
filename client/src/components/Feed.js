import React, { useState, useEffect } from 'react';
import Book from './Book';
import Placeholder from './Placeholder';
import { getBooks } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';

const Feed = props => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.books;
  });
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (state.allBooks.length === 0 || page > 0) {
      dispatch(getBooks(page));
    }
  }, [page]);
  useEffect(() => {
    return () => {
      window.onscroll = null;
    };
  }, []);
  const handleScroll = () => {
    // check if the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
    }
  };

  window.onscroll = handleScroll;

  return (
    <>
      {state.success && (
        <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {state.allBooks.map(book => (
            <Book book={book} isFeed={true} key={book._id} />
          ))}
        </div>
      )}
      {!state.loading && !state.allBooks.length > 0 && (
        <Placeholder text="No books added yet :(" buttonText="Add a new Book" link="/books/new" />
      )}
    </>
  );
};

export default Feed;
