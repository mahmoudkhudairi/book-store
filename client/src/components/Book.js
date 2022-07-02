import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useBooksContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';
const Book = ({ book }) => {
  const { _id, title, imageUrl, createdBy } = book;
  const { state, dispatch } = useBooksContext();
  const [addToFav, setAddToFav] = useState(false);
  useEffect(() => {
    // createdBy && setAddToFav(!!state.user.favDict[_id]);
  }, [book]);

  const deleteBook = () => {
    axios
      .delete(`/api/books/${_id}`)
      .then((res) => {
        dispatch({ type: 'DELETE_BOOK', payload: _id });
      })
      .catch((err) => console.log(err));
  };
  const handleFav = () => {
    setAddToFav((previousState) => {
      const newState = !previousState;
      axios.put(`/api/users/favorite/${_id}`, { addToFav: newState });
      return newState;
    });
  };
  return (
    <div
      key={_id}
      className="w-[320px] h-[475px] rounded-lg shadow-xl bg-white dark:bg-slate-600 p-8 text-center dark:text-white text-black relative"
    >
      <h2 className="font-bold text-lg capitalize">{title}</h2>
      {createdBy && (
        <FontAwesomeIcon
          onClick={handleFav}
          className={`hover:cursor-pointer absolute top-3 right-3 h-8 w-8 text-gray-300 ${
            addToFav && 'text-red-600'
          }`}
          icon={faHeart}
        />
      )}
      <img src={imageUrl} alt={''} className="p-1 h-60 mx-auto border rounded-lg my-3" />
      <p>
        Added By:
        {createdBy ? (
          <Link to={`/profile/${createdBy.name}`} className="pl-1 text-teal-500">
            {createdBy.name}
          </Link>
        ) : (
          <span>Google API </span>
        )}
      </p>
      <Link
        to={`/books/${_id}`}
        className="inline-block w-[80px] ml-4 mt-3 rounded-lg px-2 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-blue-100 duration-300"
      >
        Details
      </Link>

      {createdBy && state.user._id === createdBy._id && (
        <>
          <Link
            to={`/books/${_id}/edit`}
            state={book}
            className="ml-4 mt-3 rounded-lg px-2 py-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-green-100 duration-300 inline-block w-[80px]"
          >
            Edit
          </Link>

          <button
            onClick={deleteBook}
            className="ml-4 mt-4 rounded-lg px-2 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300 inline-block w-[80px]"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Book;
