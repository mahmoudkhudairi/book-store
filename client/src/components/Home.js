import React, { useEffect, useState } from 'react';
import Book from './Book';
import { getPublicBooks } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';
const Home = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const state = useSelector(state => {
    return state.books;
  });

  useEffect(() => {
    if (state.publicBooks.length === 0 || page > 0) {
      dispatch(getPublicBooks(page));
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
    <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {state.success && state.publicBooks.map(book => <Book book={book} key={book._id} />)}
    </div>
  );
};

export default Home;
