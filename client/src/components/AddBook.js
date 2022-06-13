import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
const AddBook = (props) => {
  const { dispatch } = useContext(Context);

  const [book, setBook] = useState({
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post('/api/books', book, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'ADD_BOOK', payload: res.data });
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        console.log('err.response:', err.response);
        console.log('err.response.data:', err.response.data);
        console.log('err.response.data.errors:', err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  const changeHandler = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <label>Title</label>
      <input value={book.title} name="title" onChange={changeHandler} type="text" />
      {errors.title ? <span className="text-danger">{errors.title.message}</span> : null}
      <label>Authors</label>
      <input value={book.authors} name="authors" onChange={changeHandler} type="text" />
      {errors.authors ? <span>{errors.authors.message}</span> : null}

      <label>publisher</label>
      <input value={book.publisher} name="publisher" onChange={changeHandler} type="text" />
      {errors.publisher ? <span>{errors.publisher.message}</span> : null}
      <label>publishedDate</label>
      <input value={book.publishedDate} name="publishedDate" onChange={changeHandler} type="text" />
      {errors.publishedDate ? <span>{errors.publishedDate.message}</span> : null}
      <label>description</label>
      <input value={book.description} name="description" onChange={changeHandler} type="text" />
      {errors.description ? <span>{errors.description.message}</span> : null}
      <label>imageUrl</label>
      <input value={book.imageUrl} name="imageUrl" onChange={changeHandler} type="text" />
      {errors.imageUrl ? <span>{errors.imageUrl.message}</span> : null}
      <button>Add Book</button>
    </form>
  );
};

export default AddBook;
