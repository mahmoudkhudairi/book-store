import React, { useEffect, useState } from 'react';
import Book from './Book';
import axios from 'axios';
const Home = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books/public')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-10  justify-around mx-5">
      {books.map((book) => (
        <Book book={book} key={book._id} />
      ))}
    </div>
  );
};

export default Home;
