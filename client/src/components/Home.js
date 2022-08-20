import React, { useEffect } from 'react';
import Book from './Book';
import { getPublicBooks } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const Home = props => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state.books;
  });
  const location = useLocation();
  useEffect(() => {
    state.publicBooks.length === 0 && dispatch(getPublicBooks());
  }, [location]);

  return (
    <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {state.success && state.publicBooks.map(book => <Book book={book} key={book._id} />)}
    </div>
  );
};

export default Home;
