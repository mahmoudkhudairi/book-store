import React from 'react';

const CommentPagination = ({ page, setPage }) => {
  const handleClick = () => {
    setPage(page + 1);
  };
  return (
    <button
      className="block w-[120px] p-2 rounded-lg mb-2 mx-auto bg-catalina-blue-500 dark:bg-catalina-blue-600 hover:bg-catalina-blue-400 hover:dark:bg-catalina-blue-500 text-white"
      onClick={handleClick}
    >
      Load More!
    </button>
  );
};

export default CommentPagination;
