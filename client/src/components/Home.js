import React, { useEffect, useContext } from 'react';
import Book from './Book';
import axios from 'axios';
import { Context } from '../context';
const Home = (props) => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    axios
      .get('/api/books')
      .then((res) => {
        dispatch({ type: 'GET_BOOKS', payload: res.data });
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
      {state.books.map((book) => (
        <Book book={book} />
      ))}
    </div>
  );
};

export default Home;
