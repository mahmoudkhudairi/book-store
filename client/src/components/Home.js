import React, { useEffect } from 'react';
import Book from './Book';
import { useBooksContext } from '../context';
import { useLocation } from 'react-router-dom';
const Home = (props) => {
  const {
    state: { publicBooks },
    getPublicBooks,
  } = useBooksContext();
  const location = useLocation();
  useEffect(() => {
    getPublicBooks();
  }, [location]);

  return (
    <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {publicBooks && publicBooks.map((book) => <Book book={book} key={book._id} />)}
    </div>
  );
};

export default Home;
