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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '20px',
        marginTop: '40px',
      }}
    >
      {books.map((book) => (
        <Book book={book} key={book._id} />
      ))}
    </div>
  );
};

export default Home;
