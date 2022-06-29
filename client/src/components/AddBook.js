import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { Context } from '../context';
const AddBook = (props) => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const submitHandler = (book, setErrors) => {
    axios
      .post('/api/books', book, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'ADD_BOOK', payload: res.data });
        navigate('/books');
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  return <Form submitHandler={submitHandler} buttonText={'Add Book'} />;
};

export default AddBook;
