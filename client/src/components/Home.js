import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  const deleteBook = (bookId) => {
    axios
      .delete(`/api/books/${bookId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: 'DELETE_BOOK', payload: bookId });
      })
      .catch((err) => console.log(err));
  };
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
        <div
          key={book._id}
          style={{
            width: '250px',
            border: '1px solid black',
            boxShadow: '0px 0px 10px black',
            padding: '20px',
          }}
        >
          <Link to={`/profile/${book.createdBy.name}`}>Add By: {book.createdBy.name}</Link>
          <h2>{book.title}</h2>
          <img src={book.imageUrl} alt={''} />
          <br />
          <Link to={`/book/${book._id}`}>Details</Link>
          <span> | </span>
          <Link to={`/book/edit/${book._id}`}>Edit</Link>
          <br />
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
