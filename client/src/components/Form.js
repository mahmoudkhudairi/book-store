import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
function Form(props) {
  const [authorInputList, setAuthorInputList] = useState(['']);
  const [book, setBook] = useState({
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!!props.oldBook) {
      setBook(props.oldBook);
      setAuthorInputList(props.oldBook.authors);
    }
  }, [props.oldBook]);

  const [errors, setErrors] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();

    props.submitHandler(book, setErrors);
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
      className="dark:bg-slate-700 bg-white mx-10 md:w-[50%] md:mx-auto p-10 rounded-xl"
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
        {errors.title ? <span className="text-danger">{errors.title.message}</span> : null}
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
        {errors.description ? <span>{errors.description.message}</span> : null}
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
                    className={`hover:cursor-pointer h-6 w-6 text-red-500 dark:text-red-600 `}
                    icon={faMinus}
                  />
                )}
                {authorInputList.length < 4 && (
                  <FontAwesomeIcon
                    onClick={handleAddClick}
                    className="hover:cursor-pointer h-6 w-6 text-teal-500 "
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
        {errors.authors ? <span>{errors.authors.message}</span> : null}
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
          {errors.publisher ? <span>{errors.publisher.message}</span> : null}
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
          {errors.publishedDate ? <span>{errors.publishedDate.message}</span> : null}
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        {book.imageUrl && <img className="pt-4" src={book.imageUrl} alt="" />}
        <input
          type="file"
          name="image"
          onChange={changeHandler}
          accept="image/*"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.imageUrl ? <span>{errors.imageUrl.message}</span> : null}
        <label
          htmlFor="image"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Image
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-800 dark:hover:bg-teal-900 dark:focus:ring-teal-900"
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
