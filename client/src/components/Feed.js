import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom';
import { Context } from '../context';
const Feed = (props) => {
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
    <div className="flex flex-wrap gap-10 justify-around mx-5 min-h-screen">
      {state.books.map((book) => (
        <Book book={book} key={book._id} />
      ))}
    </div>
  );
};

export default Feed;
