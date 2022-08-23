import { useState } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../redux/actions/comment';

const Comment = ({ comment, currentUser, bookId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ bookId, commentId: comment._id }));
  };
  const handleUpdate = () => {
    dispatch(updateComment({ bookId, commentId: comment._id, content }));
    setIsEdit(!isEdit);
  };
  return (
    <div className="group flex-1 bg-gray-200 dark:bg-gray-800 rounded-lg mx-3 my-3 px-6 py-4 leading-relaxed relative">
      <Avatar
        name={comment.createdBy.name}
        src={comment.createdBy.profilePicture}
        size={45}
        className="mr-4"
        round
      />
      <strong>{comment.createdBy.name}</strong>
      <p className="text-xs text-gray-400 mt-2 xl:absolute xl:right-5 xl:top-5">
        {moment(comment.createdAt).fromNow()}
      </p>

      {isEdit ? (
        <div className="mt-4">
          <input
            className="mr-2 text-black w-[80%] rounded p-1"
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>update</button>
        </div>
      ) : (
        <p className="mt-4 mb-2 text-xs sm:text-sm">{comment.content}</p>
      )}
      {currentUser._id === comment.createdBy._id && (
        <div className="hidden group-hover:flex  justify-center">
          <button
            className="px-2 py-2 text-green-600 hover:text-green-500 dark:hover:text-green-400"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? 'Cancel Edit' : 'Edit'}
          </button>
          <button
            className="px-2 py-2 text-red-600 hover:text-red-500 dark:hover:text-red-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
