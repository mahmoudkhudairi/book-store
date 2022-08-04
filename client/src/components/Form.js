import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useBooksContext } from '../context';
import { useNavigate } from 'react-router-dom';
function Form(props) {
  const navigate = useNavigate();
  const [authorInputList, setAuthorInputList] = useState(['']);
  const [book, setBook] = useState({
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    imageUrl: '',
  });
  const { addBook, updateBook } = useBooksContext();
  useEffect(() => {
    if (!!props.oldBook) {
      setBook(props.oldBook);
      setAuthorInputList(props.oldBook.authors);
    }
  }, [props.oldBook]);

  const [errors, setErrors] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    if (props.isAdd) {
      addBook(book)
        .then(() => {
          alert(
            "Your book is added successfully and it will be displayed once it's approved by Admin",
          );
          navigate('/books');
        })
        .catch((error) => {
          setErrors(error);
        });
    } else {
      updateBook(book)
        .then(() => navigate('/books'))
        .catch((error) => {
          setErrors(error);
        });
    }
  };
  const handleAuthorsInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...authorInputList];
    list[index] = value;
    setAuthorInputList(list);
    setBook({ ...book, authors: list });
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
  const handleRemoveClick = (index) => {
    const list = [...authorInputList];
    list.splice(index, 1);
    setAuthorInputList(list);
    setBook({ ...book, authors: list });
  };

  const handleAddClick = () => {
    setAuthorInputList([...authorInputList, '']);
  };
  return (
    <form
      className="dark:bg-slate-700 bg-gray-100 mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl"
      onSubmit={submitHandler}
    >
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={book.title}
          name="title"
          onChange={changeHandler}
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="title"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Book Title
        </label>
        {errors.title && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">{errors.title.message}</span>
        )}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={book.description}
          name="description"
          onChange={changeHandler}
          type="text"
          id="description"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />

        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
        {errors.description && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="relative z-0 w-full mb-6 group">
        {authorInputList.map((author, i) => {
          return (
            <React.Fragment key={i}>
              <input
                name="authors"
                id="authors"
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={author}
                required
                onChange={(e) => handleAuthorsInputChange(e, i)}
              />
              <div className="relative flex gap-2 justify-end mt-1">
                {authorInputList.length !== 1 && (
                  <FontAwesomeIcon
                    onClick={() => handleRemoveClick(i)}
                    className={`hover:cursor-pointer h-6 w-6 text-red-500 dark:text-red-600`}
                    icon={faMinus}
                  />
                )}
                {authorInputList.length < 4 && (
                  <FontAwesomeIcon
                    onClick={handleAddClick}
                    className="hover:cursor-pointer h-6 w-6 text-catalina-blue-500 dark:text-catalina-blue-600"
                    icon={faAdd}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
        <label
          htmlFor="authors"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
        >
          Authors
        </label>
        {errors.authors && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {errors.authors.message}
          </span>
        )}
      </div>

      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="publisher"
            id="publisher"
            value={book.publisher}
            onChange={changeHandler}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="publisher"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Publisher
          </label>
          {errors.publisher && (
            <span className="mt-2 text-red-600 dark:text-red-400 block">
              {errors.publisher.message}
            </span>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={book.publishedDate}
            onChange={changeHandler}
            type="date"
            name="publishedDate"
            id="publishedDate"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="publishedDate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            published Date
          </label>
          {errors.publishedDate && (
            <span className="mt-2 text-red-600 dark:text-red-400 block">
              {errors.publishedDate.message}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="image"
          className="block peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 mb-4"
        >
          Image
        </label>
        {book.imageUrl && <img className="pb-4" src={book.imageUrl} alt="" />}
        <label onChange={changeHandler} htmlFor="imagePicker">
          <input type="file" name="image" accept="image/*" hidden id="imagePicker" />
          <span className="text-white bg-catalina-blue-500 hover:bg-catalina-blue-800 focus:ring-4 focus:outline-none focus:ring-catalina-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-2.5 py-2 text-center dark:bg-catalina-blue-600 dark:hover:bg-catalina-blue-900 dark:focus:ring-catalina-blue-900">
            Choose Image
          </span>
          <span className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></span>
        </label>
        {errors.imageUrl && (
          <span className="mt-2 text-red-600 dark:text-red-400 block">
            {errors.imageUrl.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-catalina-blue-500 dark:bg-catalina-blue-600 hover:bg-catalina-blue-800 dark:hover:bg-catalina-blue-900 focus:ring-4 focus:outline-none focus:ring-catalina-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-catalina-blue-900"
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
