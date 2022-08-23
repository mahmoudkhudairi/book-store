import { useState, useEffect } from 'react';
import { getComments } from '../../redux/actions/comment';
import Comment from './Comment';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import CommentPagination from './CommentPagination';
const BookComments = ({ bookId }) => {
  const [{ comments, count }, { user }] = useSelector(state => [state.comments, state.user]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments({ bookId, page }));
  }, [page]);
  if (comments.length > 0) {
    return (
      <div className="mt-5 dark:bg-slate-700 bg-gray-100 mx-10 sm:w-[50%] sm:mx-auto p-4 md:p-10 rounded-xl dark:text-white ">
        <h2 className="font-bold">Comments ({count})</h2>
        <div className="overflow-y-auto h-[300px] border rounded-l-lg mt-4 p-2 bg-white dark:bg-slate-700 scrollbar dark:scrollbar-thumb-gray-700 scrollbar-thumb-gray-200 scrollbar-track-gray-300 dark:scrollbar-track-gray-800">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} currentUser={user} bookId={bookId} />
          ))}
          {comments.length < count && <CommentPagination page={page} setPage={setPage} />}
        </div>
        <CommentBox bookId={bookId} />
      </div>
    );
  }
};

export default BookComments;
