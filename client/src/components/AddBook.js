import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
const AddBook = (props) => {
  const { dispatch } = useContext(Context);
  const [authorInputList, setAuthorInputList] = useState(['']);
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
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = reader.result;
        setBook({ ...book, imageUrl: imageData });
      };
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleAuthorsInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...authorInputList];
    list[index] = value;
    setAuthorInputList(list);
    setBook({ ...book, authors: list });
  };

  const handleRemoveClick = (index) => {
    const list = [...authorInputList];
    list.splice(index, 1);
    setAuthorInputList(list);
  };

  const handleAddClick = () => {
    setAuthorInputList([...authorInputList, '']);
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
      <input
        className="border-2 border-blue-500"
        value={book.title}
        name="title"
        onChange={changeHandler}
        type="text"
      />
      {errors.title ? <span className="text-danger">{errors.title.message}</span> : null}
      <label>Authors</label>
      {authorInputList.map((author, i) => {
        return (
          <div>
            <input
              className="border-2 border-blue-500"
              name="name"
              value={author}
              onChange={(e) => handleAuthorsInputChange(e, i)}
            />

            {authorInputList.length !== 1 && (
              <button onClick={() => handleRemoveClick(i)}>Remove</button>
            )}
            {authorInputList.length - 1 === i && i < 9 && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        );
      })}
      {errors.authors ? <span>{errors.authors.message}</span> : null}

      <label>publisher</label>
      <input
        className="border-2 border-blue-500"
        value={book.publisher}
        name="publisher"
        onChange={changeHandler}
        type="text"
      />
      {errors.publisher ? <span>{errors.publisher.message}</span> : null}
      <label>publishedDate</label>
      <input
        className="border-2 border-blue-500"
        value={book.publishedDate}
        name="publishedDate"
        onChange={changeHandler}
        type="date"
      />
      {errors.publishedDate ? <span>{errors.publishedDate.message}</span> : null}
      <label>description</label>
      <input
        className="border-2 border-blue-500"
        value={book.description}
        name="description"
        onChange={changeHandler}
        type="text"
      />
      {errors.description ? <span>{errors.description.message}</span> : null}
      <label>image</label>
      <input type="file" name="image" onChange={changeHandler} accept="image/*" isRequired={true} />
      {errors.imageUrl ? <span>{errors.imageUrl.message}</span> : null}
      <button>Add Book</button>
    </form>
  );
};

export default AddBook;
