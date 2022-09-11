import { Link } from 'react-router-dom';
import ProgressiveImg from './ProgressiveImg';
import { useSelector } from 'react-redux';
import AddToFav from './AddToFav';
import DeleteBook from './DeleteBook';
import placeholderSrc from '../images/placeholder.png';
const Book = ({ book, isFeed }) => {
  const { _id, title, imageUrl, createdBy } = book;
  const state = useSelector(state => {
    return state.user;
  });
  //className="rounded-lg shadow-xl bg-gray-200 dark:bg-slate-600 p-8 text-center dark:text-white text-black relative"
  return (
    <div
      key={_id}
      className="rounded-2xl shadow-xl bg-gray-200 dark:bg-slate-600 dark:text-white text-black overflow-hidden relative"
    >
      <ProgressiveImg src={imageUrl} placeholderSrc={placeholderSrc} />
      <div className={`h-[200px] p-6 text-center flex flex-col justify-between`}>
        {isFeed && <AddToFav _id={_id} book={book} user={state.user} />}
        <h2 className="font-bold text-lg capitalize line-clamp-2">{title}</h2>
        {createdBy ? (
          <>
            <Link
              to={`/profile/${createdBy.name?.replace(/\s+/g, '-')}`}
              state={{ _id: createdBy._id }}
            >
              Added By:
              <span className="pl-1 font-bold underline underline-offset-2 hover:dark:text-catalina-blue-900 hover:text-catalina-blue-400">
                {createdBy.name}
              </span>
            </Link>
            <Link
              to={`/books/${_id}`}
              className="inline-block w-1/2 self-center mt-2 rounded-lg px-2 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-blue-100 duration-300"
            >
              Details
            </Link>
          </>
        ) : (
          <>
            <span>Source: Google API </span>
            <Link
              to={`/public-books/${_id}`}
              className="inline-block w-1/2 self-center mt-2 rounded-lg px-2 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-blue-100 duration-300"
            >
              Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Book;
