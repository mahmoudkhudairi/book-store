import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/comment';
const CommentBox = ({ bookId }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const handleSubmit = () => {
    dispatch(addComment({ bookId, content }));
    setContent('');
  };
  return (
    <div className="rounded-xl bg-gray-200 dark:bg-gray-800 px-7 py-4 md:mx-6 mt-5">
      <p className="text-xl font-semibold">Add Comment</p>
      <textarea
        className="h-20 p-3 text-sm mt-5 outline-none bg-gray-50 dark:bg-gray-700 text-black dark:text-white w-full resize-none border rounded-lg placeholder:text-sm"
        placeholder="Add your comments here"
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>

      <div className="flex justify-between mt-2">
        <button
          className="h-12 w-[140px] bg-catalina-blue-500 dark:bg-catalina-blue-600 hover:bg-catalina-blue-600 text-sm text-white rounded-lg transition-all cursor-pointer"
          onClick={handleSubmit}
        >
          Submit comment
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
