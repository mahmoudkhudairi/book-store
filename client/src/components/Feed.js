import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../context';
import { If, Then, Else } from 'react-if';
import Spinner from './Spinner';
const Feed = (props) => {
  const [shouldSpin, setShouldSpin] = useState(true);
  const { state, dispatch } = useBooksContext();

  useEffect(() => {
    axios
      .get('/api/books')
      .then((res) => {
        dispatch({ type: 'GET_BOOKS', payload: res.data });
        setShouldSpin(!shouldSpin);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <If condition={shouldSpin}>
      <Then>
        <Spinner />
      </Then>
      <Else>
        <div className="flex flex-wrap gap-10 justify-around mx-5">
          <If condition={state.books.length > 0}>
            <Then>
              {state.books.map((book) => (
                <Book book={book} key={book._id} />
              ))}
            </Then>
            <Else>
              <div className="text-center dark:bg-slate-700 bg-white mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl dark:text-white relative">
                No books added yet :(
                <Link className="block mt-2 text-teal-500 hover:underline" to="/books/new">
                  Add a new Book
                </Link>
              </div>
            </Else>
          </If>
        </div>
      </Else>
    </If>
  );
};

export default Feed;
