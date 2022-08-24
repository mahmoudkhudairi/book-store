import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addBookToFav } from '../redux/actions/book';
const AddToFav = ({ _id, user }) => {
  const [addToFav, setAddToFav] = useState(false);
  const dispatch = useDispatch();
  const handleFav = () => {
    setAddToFav(previousState => {
      const newState = !previousState;
      dispatch(addBookToFav({ _id, addToFav: newState }));
      return newState;
    });
  };
  useEffect(() => {
    user.favDict && setAddToFav(!!user.favDict[_id]);
  }, [user]);
  return (
    <div className="hover:cursor-pointer absolute top-3 right-3  text-gray-200 ">
      <FontAwesomeIcon
        onClick={handleFav}
        className={`h-8 w-8 ${addToFav && 'text-red-600'}`}
        icon={faHeart}
      />
    </div>
  );
};

export default AddToFav;
