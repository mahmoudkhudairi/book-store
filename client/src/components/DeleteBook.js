import React from 'react';
import { deleteBook } from '../redux/actions/book';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const DeleteBook = ({ _id, isDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.books);
  const handleClick = async () => {
    await dispatch(deleteBook(_id));
    !state.error && isDetails && navigate('/books');
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg px-2 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300 inline-block w-[80px] ${
        !isDetails && 'ml-4 mt-4'
      }`}
    >
      Delete
    </button>
  );
};

export default DeleteBook;
