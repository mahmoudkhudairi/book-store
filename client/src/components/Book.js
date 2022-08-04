import { Link } from 'react-router-dom';
import ProgressiveImg from './ProgressiveImg';
import { useBooksContext } from '../context';
import AddToFav from './AddToFav';
import DeleteBook from './DeleteBook';
import placeholderSrc from '../images/placeholder.png';
const Book = ({ book, isFeed }) => {
  const { _id, title, imageUrl, createdBy } = book;
  const { state, dispatch } = useBooksContext();
  //grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1/3 lg:grid-cols-4 xl:grid-cols-5
  //w-[320px] min-h-[475px]
  return (
    <div
      key={_id}
      className="rounded-lg shadow-xl bg-gray-200 dark:bg-slate-600 p-8 text-center dark:text-white text-black relative"
    >
      <h2 className="font-bold text-lg capitalize">{title}</h2>
      {isFeed && <AddToFav _id={_id} book={book} user={state.user} />}
      <ProgressiveImg src={imageUrl} placeholderSrc={placeholderSrc} />
      <p>
        Added By:
        {createdBy ? (
          <Link
            to={`/profile/${createdBy.name?.replace(/\s+/g, '-')}`}
            state={{ _id: createdBy._id }}
            className="pl-1 font-bold underline underline-offset-2 hover:dark:text-catalina-blue-900 hover:text-catalina-blue-400"
          >
            {createdBy.name}
          </Link>
        ) : (
          <span>Google API </span>
        )}
      </p>
      {createdBy ? (
        <Link
          to={`/books/${_id}`}
          state={{ isPublicBook: false }}
          className="inline-block w-[80px] ml-4 mt-3 rounded-lg px-2 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-blue-100 duration-300"
        >
          Details
        </Link>
      ) : (
        <Link
          to={`/books/${_id}`}
          state={{ isPublicBook: true }}
          className="inline-block w-[80px] ml-4 mt-3 rounded-lg px-2 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-blue-100 duration-300"
        >
          Details
        </Link>
      )}

      {createdBy && state.user._id === createdBy._id && (
        <>
          <Link
            to={`/books/${_id}/edit`}
            state={book}
            className="ml-4 mt-3 rounded-lg px-2 py-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-green-100 duration-300 inline-block w-[80px]"
          >
            Edit
          </Link>
          <DeleteBook _id={_id} dispatch={dispatch} />
        </>
      )}
    </div>
  );
};

export default Book;
