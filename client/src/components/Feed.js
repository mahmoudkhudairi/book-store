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
    <div className="flex flex-wrap gap-10 justify-around mx-5">
      {state.books.length > 0 ? (
        state.books.map((book) => <Book book={book} key={book._id} />)
      ) : (
        <div className="text-center dark:bg-slate-700 bg-white mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl dark:text-white relative">
          No books added yet :(
          <Link className="block mt-2 text-teal-500 hover:underline" to="/books/new">
            Add a new Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default Feed;
