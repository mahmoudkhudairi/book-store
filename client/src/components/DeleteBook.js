import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DeleteBook = ({ _id, dispatch, isDetails }) => {
  const navigate = useNavigate();
  const deleteBook = () => {
    axios
      .delete(`/api/books/${_id}`)
      .then((res) => {
        dispatch({ type: 'DELETE_BOOK', payload: _id });
        isDetails && navigate('/books');
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={deleteBook}
      className={`rounded-lg px-2 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300 inline-block w-[80px] ${
        !isDetails && 'ml-4 mt-4'
      }`}
    >
      Delete
    </button>
  );
};

export default DeleteBook;
