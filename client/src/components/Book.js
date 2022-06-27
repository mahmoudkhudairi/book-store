import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useBooksContext } from '../context';
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
      style={{
        width: '250px',
        border: '1px solid black',
        boxShadow: '0px 0px 10px black',
        padding: '20px',
      }}
    >
      {createdBy ? (
        <>
          <button onClick={handleFav}>{addToFav ? <>Remove From Fav</> : <>Add to Fav</>}</button>
          <Link to={`/profile/${createdBy.name}`}>Added By: {createdBy.name}</Link>
        </>
      ) : (
        <p>Added By Google API</p>
      )}
      <h2>{title}</h2>
      <img src={imageUrl} alt={''} />
      <br />
      <Link to={`/books/${_id}`}>Details</Link>

      {createdBy && state.user._id === createdBy._id && (
        <>
          <span> | </span>
          <Link to={`/books/${_id}/edit`}>Edit</Link>
          <span> | </span>
          <button onClick={deleteBook}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Book;
