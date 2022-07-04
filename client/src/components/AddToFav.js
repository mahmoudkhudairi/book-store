import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const AddToFav = ({ _id, book, user, isDetails }) => {
  const [addToFav, setAddToFav] = useState(false);
  const handleFav = () => {
    setAddToFav((previousState) => {
      const newState = !previousState;
      axios.put(`/api/users/favorite/${_id}`, {
        addToFav: newState,
      });
      return newState;
    });
  };
  useEffect(() => {
    user.favDict && setAddToFav(!!user.favDict[_id]);
  }, [user]);
  return (
    <div className="hover:cursor-pointer absolute top-3 right-3  text-gray-300 ">
      {isDetails && <span className="mr-2 inline-block">{book.favoriteCount}</span>}
      <FontAwesomeIcon
        onClick={handleFav}
        className={`h-8 w-8 ${addToFav && 'text-red-600'}`}
        icon={faHeart}
      />
    </div>
  );
};

export default AddToFav;
