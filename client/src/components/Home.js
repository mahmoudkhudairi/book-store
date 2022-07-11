import React, { useEffect } from 'react';
import Book from './Book';
import { useBooksContext } from '../context';
import { useLocation } from 'react-router-dom';
const Home = (props) => {
  const {
    state: { books },
    getPublicBooks,
  } = useBooksContext();
  const location = useLocation();
  useEffect(() => {
    getPublicBooks();
  }, [location]);

  return (
    <div className="flex flex-wrap items-center gap-10  justify-around mx-5">
      {books && books.map((book) => <Book book={book} key={book._id} />)}
    </div>
  );
};

export default Home;
