import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useBooksContext } from '../context';
const Book = (props) => {
  const { _id, title, imageUrl, createdBy } = props.book;
  const { state, dispatch } = useBooksContext();
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
      key={_id}
      style={{
        width: '250px',
        border: '1px solid black',
        boxShadow: '0px 0px 10px black',
        padding: '20px',
      }}
    >
      {createdBy ? (
        <Link to={`/profile/${createdBy.name}`}>Added By: {createdBy.name}</Link>
      ) : (
        <p>Added By Google API</p>
      )}
      <h2>{title}</h2>
      <img src={imageUrl} alt={''} />
      <br />
      <Link to={`/books/${_id}`}>Details</Link>
      <span> | </span>
      <Link to={`/books/${_id}/edit`}>Edit</Link>
      <br />
      <button onClick={() => deleteBook(_id)}>Delete</button>
    </div>
  );
};

export default Book;
